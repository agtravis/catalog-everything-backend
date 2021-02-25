'use strict';

const mongoose = require(`mongoose`);
mongoose.Promise = global.Promise;

const uri = `mongodb://localhost/catalogeverything`;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log(`Connected to Mongo`);
    },
    (err) => {
      console.log(`error connecting to Mongo: `);
      console.log(err);
    }
  );

module.exports = mongoose.connection;
