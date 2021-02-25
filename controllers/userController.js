'use strict';

const User = require(`../database/models/User`);
const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);

const errorResponseCode = 422;

module.exports = {
  changePassword: (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        User.updateOne(
          { _id: mongoose.Types.ObjectId(req.body.id) },
          {
            $set: {
              password: hash,
            },
          }
        )
          .then((dbUser) => res.json(dbUser))
          .catch((err) => res.status(errorResponseCode).json(err));
      });
    });
  },
  checkPassword: (req, res) => {
    User.findById(req.body.userId)
      .then((dbUser) => {
        bcrypt.compare(req.body.old, dbUser.password, (err, response) => {
          if (err) {
            res.send(err);
          } else {
            res.send(response);
          }
        });
      })
      .catch((err) => res.status(errorResponseCode).json(err));
  },
  findAll: (req, res) => {
    User.find(req.query)
      .then((dbUsers) => res.json(dbUsers))
      .catch((err) => res.status(errorResponseCode).json(err));
  },
  findById: (req, res) => {
    User.findById(req.params.id)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(errorResponseCode).json(err));
  },
  login: (req, res) => {
    console.log(`logged in`, req.user._id, req.user.username);
    const userInfo = {
      username: req.user.username,
      id: req.user._id,
    };
    res.send(userInfo);
  },
  logout: (req, res) => {
    if (req.user) {
      req.logout();
      res.send({ msg: `Logging out` });
    } else {
      res.send({ msg: `No user to log out` });
    }
  },
  newUser: (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.error(`User.js POST error: `, err);
      } else if (user) {
        res.json({
          error: `Sorry, already a user with the username: ${username}`,
        });
      } else {
        const newUser = new User({
          username: username,
          password: password,
        });
        newUser.save((err, savedUser) => {
          if (err) return res.json(err);
          res.json(savedUser);
        });
      }
    });
  },
  remove: (req, res) => {
    User.findById({ _id: req.params.id })
      .then((dbUser) => dbUser.remove())
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(errorResponseCode).json(err));
  },
  search: (req, res) => {
    User.find({
      username: {
        $regex: req.body.search,
        $options: `i`,
      },
    })
      .then((dbUsers) => res.json(dbUsers))
      .catch((err) => res.status(errorResponseCode).json(err));
  },
  update: (req, res) => {
    User.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body, {
      useFindAndModify: false,
    })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(errorResponseCode).json(err));
  },
  userInSession: (req, res) => {
    console.log(`===== user!!======`);
    if (req.user) {
      console.log(req.user);
      res.json({ user: req.user });
    } else {
      console.log(`No user`);
      res.json({ user: null });
    }
  },
};
