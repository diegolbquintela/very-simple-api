const express = require('express');
const expressValidator = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const HttpError = require('../models/http-error');

const router = express.Router();

router.get('/:pid', placesControllers.getPlacesById);

router.get('/user/:uid', placesControllers.getPlaceByUserId);

router.post(
  '/',
  [
    expressValidator.check('title').not().isEmpty(),
    expressValidator.check('description').isLength({ min: 5 }),
    expressValidator.check('address').not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch('/:pid', placesControllers.updatePlace);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
