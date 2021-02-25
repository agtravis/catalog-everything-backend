const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors');
const Cards = require('./dbCards');
const morgan = require(`morgan`);
const session = require(`express-session`);
const dbConnection = require(`./database`);
const MongoStore = require(`connect-mongo`).default;
const passport = require(`./passport`);
const app = express();
const path = require(`path`);
const PORT = process.env.PORT || 8001;
const connection_url =
  'mongodb+srv://admin:bFYrwUjiS@73-SF@cluster0.raeoc.mongodb.net/catalogdb?retryWrites=true&w=majority';
const routes = require(`./routes`);
app.use(morgan(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(
  process.env.MONGO_CONNECTION || `mongodb://localhost/catalogeverything`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

app.use(
  session({
    secret: `shattered-rocks`,
    store: MongoStore.create({ mongoUrl: connection_url }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

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
app.listen(PORT, () => console.log(`listening on localhost: ${PORT}`));
