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

const validateImg = [
  check('url')
    .exists({ checkFalsy: true })
    .withMessage('Url required'),
  handleValidationErrors
];

router.post('/:reviewId/images', requireAuth, validateImg, async (req, res) => {

  let id = req.params.reviewId;


  let count = await Review.count({
    where: {
      id: id
    }
  })

  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Review couldn't be found");
    err.status = 404;
      res.json({
        message: err.message,
        statusCode: err.status
    })
  }

  else {

    let review = await Review.findByPk(id);
    if (req.user.id !== review.userId) {
      let err = new Error('Review does not belong to current user');
        err.status = 401;
        res.json({
          message: err.message,
          statusCode: err.status
        })
    }

    else {

      let count1 = await ReviewImage.count({
        where: {
          reviewId: id
        }
      })

      if (count1 >= 10) {
        res.statusCode = 403;
        let err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
          res.json({
            message: err.message,
            statusCode: err.status
        })
      }

      else {
        let img = await review.createReviewImage({
          url: req.body.url
        })
        res.json({id: img.id, url: img.url})
      }
    }
  }
})

const validateRev = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists()
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

router.put('/:reviewId', requireAuth, validateRev, async (req, res) => {
  let id = req.params.reviewId;

  let count = await Review.count({
    where: {
      id: id
    }
  })

  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Review couldn't be found");
    err.status = 404;
      res.json({
        message: err.message,
        statusCode: err.status
    })
  }

  else {
    let review = await Review.findByPk(id);
    if (review.userId !== req.user.id) {
      let err = new Error('Review does not belong to current user');
      err.status = 401;
      res.json({
        message: err.message,
        statusCode: err.status
      })
    }

    else {
      review.review = req.body.review,
      review.stars = req.body.stars
      review.save()
      res.json(review);
    }
  }
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
  let id = req.params.reviewId;

  let count = await Review.count({
    where: {
      id: id
    }
  })

  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Review couldn't be found");
    err.status = 404;
      res.json({
        message: err.message,
        statusCode: err.status
    })
  }

  else {
    let review = await Review.findByPk(id);
    if (review.userId !== req.user.id) {
      let err = new Error('Review does not belong to current user');
      err.status = 401;
      res.json({
        message: err.message,
        statusCode: err.status
      })
    }

    else {
      review.destroy()
      res.json({
        message: "Successfully Deleted",
        statusCode: 200
      });
    }
  }
})


module.exports = router;
