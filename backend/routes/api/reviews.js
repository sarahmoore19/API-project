const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize } = require('../../db/models');
const Op = sequelize.Op;
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async (req, res) => {
  let revs = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"]
      },
      {
        model: Spot,
        attributes: [
          "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price"
        ]
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"]
      }
    ]
  })

  let revObjs = [];

  for (let i = 0; i < revs.length; i++) {
    revObjs.push(revs[i].toJSON())
  }

  for (let i = 0; i < revObjs.length; i++) {
    let rev = revObjs[i];

    try {
    let prev = await SpotImage.findOne({
      where: {
        spotId: rev.Spot.id,
        preview: true
      }
    })
    rev.Spot.previewImage = prev.toJSON().url
    }
    catch {
    rev.Spot.previewImage = null
    }

  }

  res.json({Reviews: revObjs});
})


module.exports = router;
