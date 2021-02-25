'use strict';

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const bcrypt = require(`bcrypt`);
mongoose.promise = Promise;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: `Category`,
    },
  ],
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: `item`,
    },
  ],
});

userSchema.methods = {
  checkPassword: (inputPassword) =>
    bcrypt.compareSync(inputPassword, this.password),
  hashPassword: (plainTextPassword) => bcrypt.hashSync(plainTextPassword, 10),
};

userSchema.pre(`save`, (next) => {
  if (!this.password) {
    console.log(`NO PASSWORD PROVIDED`);
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model(`User`, userSchema);
module.exports = User;
