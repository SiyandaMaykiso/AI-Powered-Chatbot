// routes/chatRoutes.js

const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Existing routes
router.post('/chat', authMiddleware, chatController.chat);
router.get('/chat-history', authMiddleware, chatController.getChatHistory);

// New PATCH route for updating chat logs
router.patch('/chat/:id', authMiddleware, chatController.updateChatLog);

// New DELETE route for deleting chat logs
router.delete('/chat/:id', authMiddleware, chatController.deleteChatLog);

module.exports = router;
