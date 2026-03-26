const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homevalor');
    
    const adminExists = await User.findOne({ email: 'admin@homevalor.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@homevalor.com',
        password: 'admin123',
        isAdmin: true
      });
      console.log('Admin user created');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();