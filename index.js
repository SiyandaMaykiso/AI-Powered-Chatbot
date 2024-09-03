// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Root endpoint for testing the API
app.get('/', (req, res) => {
    res.send('Welcome to the AI-Powered Chatbot API!');
});

// Endpoint to handle user queries
app.post('/api/query', async (req, res) => {
    try {
        const { userQuery } = req.body;

        // Validate the incoming request
        if (!userQuery) {
            return res.status(400).json({ error: 'User query is required' });
        }

        // Make a direct API call to OpenAI using Axios
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: userQuery,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        // Send the response back to the client
        res.json({ response: response.data.choices[0].text.trim() });
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
