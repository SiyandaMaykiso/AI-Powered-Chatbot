const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Split the token to verify it has the correct format: Bearer <token>
  const tokenParts = token.split(' ');
  if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const actualToken = tokenParts[1];

  // Verify the token
  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    // Check if decoded token contains an id
    if (!decoded.id) {
      return res.status(400).json({ error: 'Invalid token: no user id' });
    }

    // Save the decoded token (user data) in the request object for use in other routes
    req.user = decoded;

    next();
  });
};
