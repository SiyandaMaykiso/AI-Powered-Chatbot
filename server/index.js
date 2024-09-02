// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Configure OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

        // Call OpenAI API to generate a response
        const completion = await openai.createCompletion({
            model: 'text-davinci-003', // Specify the model
            prompt: userQuery,
            max_tokens: 150, // Control the length of the response
            temperature: 0.7, // Adjust the creativity of the response
        });

        // Send the response back to the client
        res.json({ response: completion.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error handling query:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your query' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
