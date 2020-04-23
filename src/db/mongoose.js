const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
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