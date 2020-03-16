const mongoose = require('mongoose');
const { isEmpty } = require('validator');

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true, // required field
    maxlength: 30, // build-in validation
    trim: true, // trim value
    validate(value) { // custom validation of mongoose
      if (isEmpty(value)) { // validator package
        throw new Error('Description should not be empty.');
      }
    },
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  }
})

module.exports = Task;