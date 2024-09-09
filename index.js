// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');  // Import path to serve static files
const authMiddleware = require('./middlewares/authMiddleware');  // Import the authMiddleware
const ChatLog = require('./models/ChatLog');  // Import the ChatLog model
const bcrypt = require('bcryptjs');
const User = require('./models/User');  // Assuming you have a User model for managing users

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend running on localhost:3000
})); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Import routes
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');  // Import the chat routes

// Use routes
app.use('/', authRoutes);  // This will handle /register and /login
app.use('/', chatRoutes);  // This will handle /chat

// Serve static files from the React app (client/build)
app.use(express.static(path.join(__dirname, 'client/build')));

// Root endpoint for testing the API
app.get('/', (req, res) => {
    res.send('Welcome to the AI-Powered Chatbot API!');
});

// Serve React app for any unknown routes (i.e., React routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Add logging to the /login route for troubleshooting
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', { username, password });

        // Simulate user lookup and password validation (you should use your database here)
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Simulate JWT generation
        const token = 'dummy-token'; // Replace this with actual JWT generation logic
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a register route
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Register attempt:', { username, password });

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already registered' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user in the database
        const newUser = await User.create({ username, password: hashedPassword });

        // Simulate JWT generation
        const token = 'dummy-token'; // Replace this with actual JWT generation logic
        res.json({ token });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to handle user queries
app.post('/api/query', authMiddleware, async (req, res) => {
    try {
        console.log("req.user in /api/query:", req.user);

        const { userQuery } = req.body;

        // Validate the incoming request
        if (!userQuery) {
            return res.status(400).json({ error: 'User query is required' });
        }

        // Make a direct API call to OpenAI using Axios
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userQuery }],
                max_tokens: 172,
                temperature: 0.8,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const apiResponse = response.data.choices[0].message.content.trim();

        // Save the query log in the ChatLog database
        await ChatLog.create({
            userId: req.user.id,
            message: userQuery,
            response: apiResponse,
        });

        // Send the response back to the client
        res.json({ response: apiResponse });
    } catch (error) {
        console.error('Error handling query:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your query' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});