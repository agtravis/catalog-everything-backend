const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors');
const Cards = require('./dbCards');

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  'mongodb+srv://admin:bFYrwUjiS@73-SF@cluster0.raeoc.mongodb.net/catalogdb?retryWrites=true&w=majority';

// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
// mongoose.connect(connection_url, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

// API endpoints
app.get('/', (req, res) => res.status(200).send('catalog everything!'));

app.post('/tinder/cards', (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/tinder/cards', (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
