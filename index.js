
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const authMiddleware = require('./middlewares/authMiddleware');
const ChatLog = require('./models/ChatLog'); 
const User = require('./models/User'); 
const sequelize = require('./config/db'); 


dotenv.config();


const app = express();


app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(bodyParser.json()); 


const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');


app.use('/', authRoutes);  
app.use('/', chatRoutes);  


app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => {
    res.send('Welcome to the AI-Powered Chatbot API!');
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', { username, password });

        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Register attempt:', { username, password });

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/chat', authMiddleware, async (req, res) => {
    try {
        console.log("req.user in /chat:", req.user);

        const { userQuery } = req.body;
        if (!userQuery) {
            return res.status(400).json({ error: 'User query is required' });
        }

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userQuery }],
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

        const apiResponse = response.data.choices[0].message.content.trim();

        await ChatLog.create({
            userId: req.user.id,
            message: userQuery,
            response: apiResponse,
        });

        res.json({ response: apiResponse });
    } catch (error) {
        console.error('Error handling query:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your query' });
    }
});


app.get('/chathistory', authMiddleware, async (req, res) => {
    try {
        const chatLogs = await ChatLog.findAll({ where: { userId: req.user.id } });
        res.json({ chatHistory: chatLogs });
    } catch (error) {
        console.error('Error fetching chat history:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching chat history' });
    }
});


sequelize.sync({ force: false }) 
    .then(() => {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to sync database:', err.message);
    });