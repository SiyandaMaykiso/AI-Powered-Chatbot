const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  
  const tokenParts = token.split(' ');
  if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const actualToken = tokenParts[1];

  
  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    
    if (!decoded.id) {
      return res.status(400).json({ error: 'Invalid token: no user id' });
    }

    
    req.user = decoded;

    next();
  });
};
