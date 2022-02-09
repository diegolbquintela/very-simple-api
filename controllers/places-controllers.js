const { v4: uuid4 } = require('uuid'); //v4 with timestamp component

const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError(
      'Could not find a place for the provided place id.',
      404
    );
  }

  res.json({ place });
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

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
