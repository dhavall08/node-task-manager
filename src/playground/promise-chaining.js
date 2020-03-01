require('../db/mongoose');
const Task = require('../models/task');

Task.findByIdAndDelete('5e52a35a6d20312e0e2c9cf5').then(task => {
  console.log(task);
  return Task.countDocuments({ complete: true });
}).then(count => {
  console.log(count);
}).catch(e => {
  console.log(e);
})