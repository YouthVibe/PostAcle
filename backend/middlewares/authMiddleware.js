import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ message: 'API Key is required' });
  }

  try {
    const user = await User.findOne({ apiKey });

    if (!user) {
      return res.status(403).json({ message: 'Invalid API Key' });
    }

    req.user = user; // Attach user object to the request
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authMiddleware;