

const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/chat', authMiddleware, chatController.chat); 
router.get('/chathistory', authMiddleware, chatController.getChatHistory);


router.patch('/chat/:id', authMiddleware, chatController.updateChatLog);


router.delete('/chat/:id', authMiddleware, chatController.deleteChatLog);

module.exports = router;
