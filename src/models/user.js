const mongoose = require('mongoose');

const User = mongoose.model('User', {
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot be \'password\'.');
      }
    }
  }
})

module.exports = User;