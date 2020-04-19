const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token }); // 201 Created
  }
  catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ['email', 'password', 'age', 'name'];
  const isValidOperation = updates.every(update => allowed.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    // const user = await User.findById(req.params.id);
    // if (!user) {
    //   return res.status(404).send(); // 404 Not Found
    // }
    // no need of above code as auth middleware checks for user
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save();
    res.send(req.user);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message); // 400 Bad Request
  }
});

router.get('/users/me', auth, (req, res) => {
  res.send(req.user);
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save();
    res.send();
  }
  catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  }
  catch (e) {
    res.send(500).send();
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    // or below
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|pnb)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(undefined, true);
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.send();
}, (err, req, res, next) => { // error handling for a specific route
  res.status(400).send({ error: err.message });
});

/* pass (err, req, res, next) =>{ // something } in app.use for global error handling
   mostly in production
   we can also add error handling for specific routes starting with something
*/

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-type', 'image/jpg');
    res.send(user.avatar);
  }
  catch (e) {
    res.status(404).send();
  }
});

module.exports = router;