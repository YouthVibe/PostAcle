import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;

async function createTestUsers() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for test user creation.');

    const usersToCreate = [
      {
        username: 'ownerUser',
        password: 'password123',
        apiKey: 'ownerApiKey',
        userType: 'owner',
        permissions: {
          canWriteTempBlog: true,
          canEditBlog: true,
          canDeleteBlog: true,
          canUpdateBlog: true,
          canApproveTempBlog: true,
          canDeApproveBlog: true,
          canDeleteUsers: true,
          canRecruitWriters: true,
          isOwner: true
        }
      },
      {
        username: 'writerUser',
        password: 'password123',
        apiKey: 'writerApiKey',
        userType: 'writer',
        permissions: {
          canWriteTempBlog: true,
          canEditBlog: false,
          canDeleteBlog: false,
          canUpdateBlog: false,
          canApproveTempBlog: false,
          canDeApproveBlog: false,
          canDeleteUsers: false,
          canRecruitWriters: false,
          isOwner: false
        }
      },
      {
        username: 'recruiterUser',
        password: 'password123',
        apiKey: 'recruiterApiKey',
        userType: 'recruiter',
        permissions: {
          canWriteTempBlog: false,
          canEditBlog: false,
          canDeleteBlog: false,
          canUpdateBlog: false,
          canApproveTempBlog: false,
          canDeApproveBlog: false,
          canDeleteUsers: false,
          canRecruitWriters: true,
          isOwner: false
        }
      },
      {
        username: 'managerUser',
        password: 'password123',
        apiKey: 'managerApiKey',
        userType: 'manager',
        permissions: {
          canWriteTempBlog: true,
          canEditBlog: true,
          canDeleteBlog: true,
          canUpdateBlog: true,
          canApproveTempBlog: true,
          canDeApproveBlog: true,
          canDeleteUsers: true,
          canRecruitWriters: false,
          isOwner: false
        }
      }
    ];

    for (const userData of usersToCreate) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = new User({
        ...userData,
        password: hashedPassword
      });
      await newUser.save();
      console.log(`User ${newUser.username} created successfully.`);
    }

    console.log('All test users created.');
  } catch (error) {
    console.error('Error creating test users:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

createTestUsers();