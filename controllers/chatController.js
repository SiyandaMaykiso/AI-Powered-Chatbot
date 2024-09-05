const axios = require('axios');
const ChatLog = require('../models/ChatLog');

// Method to handle user chat requests
exports.chat = async (req, res) => {
    const { message, previousMessageId } = req.body;

    try {
        // Validate the incoming request
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Fetch the previous message context if previousMessageId is provided
        let previousMessages = [];
        if (previousMessageId) {
            const previousMessagesData = await ChatLog.findAll({
                where: { userId: req.user.id },
                order: [['createdAt', 'ASC']],
                limit: 5 // Fetch the last 5 messages for context
            });
            
            previousMessagesData.forEach(log => {
                previousMessages.push({ role: 'user', content: log.message });
                previousMessages.push({ role: 'assistant', content: log.response });
            });
        }

        // Include the new message in the conversation
        previousMessages.push({ role: 'user', content: message });

        // Add system instruction to focus on concise and complete responses
        previousMessages.push({
            role: 'system',
            content: 'Provide a response that fits within 150 tokens and ends with a complete thought.'
        });

        // Make a direct API call to OpenAI using Axios with the conversation history
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: previousMessages,
                max_tokens: 165,
                temperature: 0.8,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const chatResponse = response.data.choices[0].message.content.trim();

        // Save the chat log in the database with the previousMessageId
        const newChatLog = await ChatLog.create({
            userId: req.user.id,
            message,
            response: chatResponse,
            previousMessageId: previousMessageId || null // Include the previousMessageId if provided
        });

        // Return the saved chat log including the ID
        res.status(200).json(newChatLog);
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

// Method to update a chat log
exports.updateChatLog = async (req, res) => {
  const { id } = req.params;
  const { message, response } = req.body;

  try {
      // Find the chat log by its ID
      const chatLog = await ChatLog.findOne({ where: { id, userId: req.user.id } });

      if (!chatLog) {
          return res.status(404).json({ error: 'Chat log not found' });
      }

      // Update the message and/or response
      chatLog.message = message || chatLog.message;
      chatLog.response = response || chatLog.response;

      // Save the updated chat log
      await chatLog.save();

      res.status(200).json({ message: 'Chat log updated successfully', chatLog });
  } catch (error) {
      console.error('Error updating chat log:', error.message);
      res.status(500).json({ error: 'Error updating chat log' });
  }
};

// Method to delete a chat log
exports.deleteChatLog = async (req, res) => {
  const { id } = req.params;

  try {
      // Find the chat log by its ID and ensure it belongs to the authenticated user
      const chatLog = await ChatLog.findOne({ where: { id, userId: req.user.id } });

      if (!chatLog) {
          return res.status(404).json({ error: 'Chat log not found' });
      }

      // Delete the chat log
      await chatLog.destroy();

      res.status(200).json({ message: 'Chat log deleted successfully' });
  } catch (error) {
      console.error('Error deleting chat log:', error.message);
      res.status(500).json({ error: 'Error deleting chat log' });
  }
};
