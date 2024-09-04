// routes/chatRoutes.js

const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to handle the chat interaction
router.post('/chat', authMiddleware, chatController.chat);

// Route to retrieve chat history for the authenticated user
router.get('/chat-history', authMiddleware, chatController.getChatHistory);

module.exports = router;
