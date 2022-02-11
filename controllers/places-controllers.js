const { v4: uuid4 } = require('uuid'); //v4 with timestamp component
const expressValidator = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Madrid',
    description:
      '«Fui sobre agua edificada, mis muros de fuego son. Esta es mi insignia y blasón»',
    location: {
      lat: 40.4168,
      lng: 3.7038,
      // address: 'Madrid, Spain', TODO:
      creator: 'u1',
    },
  },
];

const getPlacesById = (req, res, next) => {
  const placeId = req.params.pid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.id === placeId;
  });

  if (!places || places.length === 0) {
    throw new HttpError(
      'Could not find places for the provided place id.',
      404
    );
  }

  res.json({ places });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    throw new HttpError(
      'Could not find a place for the provided user id.',
      404
    );
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (errors.isEmpty()) {
    res.status(422);
    throw new HttpError('Invalid inputs passed.', 422);
  }

  const { title, description, coordinates, creator } = req.body;

  const createdPlace = {
    id: uuid4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (errors.isEmpty()) {
    res.status(422);
    throw new HttpError('Invalid inputs passed.', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError('Could not find the place', 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlacesById = getPlacesById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
