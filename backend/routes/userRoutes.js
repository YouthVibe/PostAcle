import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import bcrypt from 'bcrypt';

// Register a new user (only owner can do this)
router.post('/register', authMiddleware, async (req, res) => {
  if (!req.user.permissions.isOwner) {
    return res.status(403).json({ message: 'Only owners can register new users' });
  }

  const { username, password, userType, apiKey } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      apiKey,
      userType,
      permissions: {
        canWriteTempBlog: userType === 'writer',
        canEditBlog: userType === 'writer' || userType === 'manager',
        canDeleteBlog: userType === 'manager',
        canUpdateBlog: userType === 'manager',
        canApproveTempBlog: userType === 'manager',
        canDeApproveBlog: userType === 'manager',
        canDeleteUsers: userType === 'manager',
        canRecruitWriters: userType === 'recruiter',
        isOwner: userType === 'owner'
      }
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// User login (authenticate with username and password)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ 
      message: 'Logged in successfully', 
      apiKey: user.apiKey 
    });
  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;