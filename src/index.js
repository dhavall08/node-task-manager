const express = require('express');
require('./db/mongoose');
const tasksRoutes = require('./routers/tasksRoutes');
const userRoutes = require('./routers/userRoutes');
const Task = require('./models/task');
const User = require('./models/user');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// same as app.use(bodyParser.json()); where bodyParser is different npm module
// header content-type should be application/json

// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down. Check back later!');
// })

app.use(userRoutes);
app.use(tasksRoutes);

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

const demoRelation = async () => {
  // const task = await Task.findById('5e6e3a14288b7c271a45aea3');
  // await task.populate('owner').execPopulate();
  // console.log(task.owner);
  const user = await User.findById('5e6e35d9a8cc5a2255f2c889');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
}
// demoRelation();
