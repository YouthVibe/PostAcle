import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    type: Object,
    required: true,
    default: {
      canWriteTempBlog: false,
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
  userType: {
    type: String,
    required: true,
    enum: ['owner', 'writer', 'recruiter', 'manager'],
    default: 'writer'
  }
});

const User = mongoose.model('User', userSchema);

export default User;