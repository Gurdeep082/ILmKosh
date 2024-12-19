const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // Ensure `name` is required
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Register user method
userSchema.statics.registerUser = async function (name, email, password) {
  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = new this({ name, email, password }); // Include name
  return await newUser.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;