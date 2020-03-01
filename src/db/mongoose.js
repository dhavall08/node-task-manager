const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// const userOne = new User({
//   password: 'adsdfggh1',
// })

// userOne.save().then((result) => {
//   console.log('Result', result);
// }).catch((error) => {
//   console.log('Error!', error);
// })

// const taskOne = new Task({
//   description: 'new desc.',
// })

// taskOne.save().then((result) => {
//   console.log('Result', result);
// }).catch((error) => {
//   console.log('Error!', error);
// })