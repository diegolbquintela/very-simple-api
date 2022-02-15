const express = require('express');
const expressValidator = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const HttpError = require('../models/http-error');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.post(
  '/',
  [
    expressValidator.check('title').not().isEmpty(),
    expressValidator.check('description').isLength({ min: 5 }),
    expressValidator.check('address').not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  '/:pid',
  [
    expressValidator.check('title').not().isEmpty(),
    expressValidator.check('description').isLength({ min: 5 }),
  ],
  placesControllers.updatePlace
);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
