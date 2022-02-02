const db_operations = require('../database/operations');
const { request, resonse, response } = require('express');
const User = require('../models/user').Users;
const db_utils = require('../helpers/db');

async function getUser(req = request, res = resonse) {
  try {
    const user = await User.findOne({ _id: req.id });
    const { username, email, contents } = user;
    res.json({ username, email, contents });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function putUser(req = request, res = response) {
  const body = req.body;
  try {
    await db_operations.findOneAndUpdate(User,
      {
        _id: req.id,
      },
      body.fields
    );
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await User.findOneAndDelete({ _id: req.id });
    res.json({ id: req._id, message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function postUserContent(req = request, res = response) {
  const body = req.body;
  try {
    const data = await db_utils.insertContent(body, req.id);
    res.json({
      message: (body.category === 'movie' ? 'Movie added to your library' : 'TV show added to your library'),
      content: data.title.id
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getUserContent(req = request, res = response) {
  try {
    const user = await User.findOne({ _id: req.id });
    res.json(user.contents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Todo: Refactorizar
async function putUserContent(req = request, res = response) {
  const body = req.body;
  try {
    let obj = {};
    for (let key in body) {
      const content_key = `contents.$.${key}`
      if (key == 'date_watched') {
        obj[content_key] = new Date(body[key]);
      } else {
        obj[content_key] = body[key];
      }
    }
    await db_operations.findOneAndUpdate(User,
      {
        _id: req.id,
        'contents.info.title.id': body.id
      },
      {
        $set: obj
      });
    res.json({ message: 'Content updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteUserContent(req = request, res = response) {
  try {
    for (let id of req.body.ids) {
      await db_operations.findOneAndUpdate(User, { _id: req.id }, { $pull: { contents: { 'info.title.id': id } } });
    }
    res.json({ message: 'Contents deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


module.exports = {
  postUserContent,
  getUserContent,
  putUserContent,
  deleteUserContent,
  getUser,
  putUser,
  deleteUser
}