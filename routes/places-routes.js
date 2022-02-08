const express = require('express');

const router = express.Router();

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

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place });
});

module.exports = router;
