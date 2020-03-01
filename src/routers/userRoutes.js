const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save().then((response) => {
    res.status(201).send(response);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

router.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch(e => {
    res.status(500).send();
  })
})

module.exports = router;