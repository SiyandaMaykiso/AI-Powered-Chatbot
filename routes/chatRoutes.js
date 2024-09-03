// routes/chatRoutes.js

const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/chat', authMiddleware, chatController.chat);

module.exports = router;
