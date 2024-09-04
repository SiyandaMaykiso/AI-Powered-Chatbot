// controllers/chatController.js

const axios = require('axios');
const ChatLog = require('../models/ChatLog');

// Method to handle user chat requests
exports.chat = async (req, res) => {
    const { message } = req.body;

    try {
        // Validate the incoming request
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Make a direct API call to OpenAI using Axios with the new model
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
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

        const chatResponse = response.data.choices[0].message.content.trim();

        // Save the chat log in the database
        await ChatLog.create({
            userId: req.user.id,
            message,
            response: chatResponse,
        });

        // Send the response back to the client
        res.status(200).json({ message: chatResponse });
    } catch (error) {
        console.error('Error processing message:', error.message);
        res.status(500).json({ error: 'Error processing message' });
    }
};

// Method to retrieve chat history for the authenticated user
exports.getChatHistory = async (req, res) => {
    try {
        // Query the chat logs for the authenticated user by their user ID
        const chatHistory = await ChatLog.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'ASC']]  // Sort by the created time
        });

        // Return the chat history
        res.status(200).json({ chatHistory });
    } catch (error) {
        console.error('Error retrieving chat history:', error.message);
        res.status(500).json({ error: 'Error retrieving chat history' });
    }
};
