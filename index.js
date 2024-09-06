// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const authMiddleware = require('./middlewares/authMiddleware');  // Import the authMiddleware
const ChatLog = require('./models/ChatLog');  // Import the ChatLog model

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

// Root endpoint for testing the API
app.get('/', (req, res) => {
    res.send('Welcome to the AI-Powered Chatbot API!');
});

// Endpoint to handle user queries
app.post('/api/query', authMiddleware, async (req, res) => {
    try {
        console.log("req.user in /api/query:", req.user);  // Debug to check if req.user is set

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
            userId: req.user.id,  // Ensure the user is authenticated
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
