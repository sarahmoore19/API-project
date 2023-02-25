const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize } = require('../../db/models');
const Op = sequelize.Op;
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res, next) => {
  let spots = await Spot.findAll({});

  let spotObjs = [];
  for (let i = 0; i < spots.length; i++) {
    spotObjs.push(spots[i].toJSON())
  }

  for (let i = 0; i < spotObjs.length; i++) {

    let spot = spotObjs[i];

    let reviews = await Review.findOne({
      where: {
        spotId: spot.id
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
      ]
    })
    spot.avgRating = reviews.toJSON().avgRating;

    let img = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true
      }
    })
    spot.previewImage = img.toJSON().url;
  }

  res.json({Spots: spotObjs})
})



module.exports = router;
