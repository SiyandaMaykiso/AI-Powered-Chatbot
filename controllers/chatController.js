// controllers/chatController.js

const { Configuration, OpenAIApi } = require('openai');
const ChatLog = require('../models/ChatLog');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.chat = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
    });

    const chatResponse = response.data.choices[0].text.trim();

    await ChatLog.create({
      userId: req.user.id,
      message,
      response: chatResponse,
    });

    res.status(200).json({ message: chatResponse });
  } catch (error) {
    res.status(500).json({ error: 'Error processing message' });
  }
};
