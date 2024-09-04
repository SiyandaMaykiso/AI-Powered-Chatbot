const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if the token is provided
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: 'No token provided' });
  }

  // Split the token to verify it has the correct format: Bearer <token>
  const tokenParts = token.split(' ');
  if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
    console.log("Invalid token format");
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const actualToken = tokenParts[1];

  // Verify the token

  console.log("JWT_SECRET used for verification:", process.env.JWT_SECRET);

  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Failed to authenticate token", err);
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    // Log the decoded token for debugging
    console.log("Decoded token:", decoded);

    // Check if decoded token contains an id
    if (!decoded.id) {
      console.log("Token decoded but no id found");
      return res.status(400).json({ error: 'Invalid token: no user id' });
    }

    // Save the decoded token (user data) in the request object for use in other routes
    req.user = decoded;
    console.log("req.user set to:", req.user);

    next();
  });
};
