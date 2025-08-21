const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  group_ids: { 
    type: Array, 
    required: false 
  },
  name: { 
    type: String, 
    required: true 
  },
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(inputtedPassword) {
  return await bcrypt.compare(inputtedPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);