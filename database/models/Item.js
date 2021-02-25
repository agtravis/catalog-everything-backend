'use strict';

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: `Category`,
  },
  title: { type: String, unique: true, required: true },
  subtitle: { type: String },
  author: { type: String },
  description: { type: String },
});

const Item = mongoose.model(`Item`, itemSchema);
module.exports = Item;
