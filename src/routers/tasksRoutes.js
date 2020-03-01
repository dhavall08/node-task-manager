const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }

  /* Task.find({}).then((tasks) => {
    res.send(tasks);
  }).catch(e => {
    res.status(500).send();
  }) */
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

  /* Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }).catch(e => {
    res.status(500).send();
  }) */
})

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body); // resource creation endpoint

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
  /* 
    task.save().then((response) => {
      res.status(201).send(response);
    }).catch((err) => {
      res.status(400).send(err);
    }) */
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ['completed', 'description'];
  const isValidOperation = updates.every(update => allowed.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach(update => task[update] = req.body[update])
    await task.save();
    res.send(task);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;