const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./routes/places-routes');
const config = require('./config');

const url = config.url;
const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// only reached if request didn't get response
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'Unknown error ocurred.' });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
