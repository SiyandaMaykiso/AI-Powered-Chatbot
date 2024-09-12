const axios = require('axios');
const ChatLog = require('../models/ChatLog');


let conversationState = {
    currentTopic: null,
    subTopics: [],
};


const detectTopic = (message) => {
    
    const commonWords = ['the', 'is', 'of', 'a', 'in', 'to', 'and', 'about', 'for'];
    const words = message
        .toLowerCase()
        .split(' ')
        .filter(word => word.length > 2 && !commonWords.includes(word));

    if (words.length > 0) {
        
        conversationState.currentTopic = words[0]; 
    }

    
    if (message.toLowerCase().includes('detail') || message.toLowerCase().includes('expand')) {
        conversationState.subTopics.push('detail');
    } else if (message.toLowerCase().includes('more')) {
        conversationState.subTopics.push('more');
    }

    
};


exports.chat = async (req, res) => {
    const { message, previousMessageId } = req.body;

    try {
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        
        detectTopic(message);

        
        let previousMessages = [];
        if (previousMessageId) {
            const previousMessagesData = await ChatLog.findAll({
                where: { userId: req.user.id },
                order: [['createdAt', 'ASC']],
                limit: 10 
            });
            
            previousMessagesData.forEach(log => {
                previousMessages.push({ role: 'user', content: log.message });
                previousMessages.push({ role: 'assistant', content: log.response });
            });
        }

        
        previousMessages.push({ role: 'user', content: message });

        
        previousMessages.push({
            role: 'system',
            content: `Provide a response related to the topic: "${conversationState.currentTopic}" that fits within 150 tokens, resolves pronouns or references like "it" or "this" to the prior conversation, and ends with a complete thought.`
        });

        
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: previousMessages,
                max_tokens: 195,
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

        
        const newChatLog = await ChatLog.create({
            userId: req.user.id,
            message,
            response: chatResponse,
            previousMessageId: previousMessageId || null 
        });

        
        res.status(200).json(newChatLog);
    } catch (error) {
        console.error('Error processing message:', error.message);
        res.status(500).json({ error: 'Error processing message' });
    }
};


exports.getChatHistory = async (req, res) => {
    try {
        
        const chatHistory = await ChatLog.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'ASC']]  
        });

        
        res.status(200).json({ chatHistory });
    } catch (error) {
        console.error('Error retrieving chat history:', error.message);
        res.status(500).json({ error: 'Error retrieving chat history' });
    }
};


exports.updateChatLog = async (req, res) => {
  const { id } = req.params;
  const { message, response } = req.body;

  try {
      
      const chatLog = await ChatLog.findOne({ where: { id, userId: req.user.id } });

      if (!chatLog) {
          return res.status(404).json({ error: 'Chat log not found' });
      }

      
      chatLog.message = message || chatLog.message;
      chatLog.response = response || chatLog.response;

      
      await chatLog.save();

      res.status(200).json({ message: 'Chat log updated successfully', chatLog });
  } catch (error) {
      console.error('Error updating chat log:', error.message);
      res.status(500).json({ error: 'Error updating chat log' });
  }
};


exports.deleteChatLog = async (req, res) => {
  const { id } = req.params;

  try {
      
      const chatLog = await ChatLog.findOne({ where: { id, userId: req.user.id } });

      if (!chatLog) {
          return res.status(404).json({ error: 'Chat log not found' });
      }

      
      await chatLog.destroy();

      res.status(200).json({ message: 'Chat log deleted successfully' });
  } catch (error) {
      console.error('Error deleting chat log:', error.message);
      res.status(500).json({ error: 'Error deleting chat log' });
  }
};