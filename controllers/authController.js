// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({ username, password: hashedPassword });

    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Respond with the generated token
    res.status(201).json({ message: 'User created successfully', token }); // Return token
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database by their username
    const user = await User.findOne({ where: { username } });

    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Log the JWT secret for debugging purposes
    console.log("JWT_SECRET used for signing:", process.env.JWT_SECRET);

    // Respond with the generated token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};