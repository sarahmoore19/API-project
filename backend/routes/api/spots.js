const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize } = require('../../db/models');
const Op = sequelize.Op;
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

async function addImgRating(spots) {
  let spotObjs = [];
  for (let i = 0; i < spots.length; i++) {
    spotObjs.push(spots[i].toJSON())
  }

  for (let i = 0; i < spotObjs.length; i++) {

    let spot = spotObjs[i];


    try {
    let reviews = await Review.findOne({
      where: {
        spotId: spot.id
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
      ]
    })
    spot.avgRating = reviews.toJSON().avgRating;
    }
    catch {
      spot.avgRating = null;
    }

    try {
    let img = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true
      }
    })
    spot.previewImage = img.toJSON().url;
   }
   catch {
    spot.previewImage = null;
   }

  }
  return spotObjs
}

router.get('/', async (req, res, next) => {
  let spots = await Spot.findAll();

  spots = await addImgRating(spots)

  return res.json({Spots: spots})
})

router.get('/current', requireAuth, async (req, res, next) => {
  let spots = await req.user.getSpots();

  spots = await addImgRating(spots)

  return res.json({Spots: spots})
})

router.get('/:spotId', async (req, res, next) => {
  try {
  let spot1 = await Spot.findByPk(req.params.spotId, {
    include: [
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        }
    ]
  })

  let spot = spot1.toJSON()

  let owner = await User.findByPk( spot.ownerId, {
    attributes: ['id', 'firstName', 'lastName']
  })
  spot.Owner = owner.toJSON()

  try {
  let reviews = await Review.findOne({
    where: {
      spotId: spot1.id
    },
    attributes: [
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'numReviews']
    ]
  })
  spot.avgStarRating = reviews.toJSON().avgRating;
  spot.numReviews = reviews.toJSON().numReviews;
  }
  catch {
    spot.avgStarRating = null;
    spot.numReviews = null;
  }
  try {
  let img = await SpotImage.findOne({
    where: {
      spotId: spot1.id,
      preview: true
    }
  })
  spot.previewImage = img.toJSON().url
  }
  catch {
    spot.previewImage = null;
  }

  return res.json(spot)
 }

  catch(e) {
    res.statusCode = 404;
    let err = new Error("Spot couldn't be found");
    res.statusCode = 404;
    err.status = 404
    return res.json({
      message: err.message,
      statusCode: err.status
    })
  }
})

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists()
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists()
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
   check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];


router.post('/', requireAuth, validateSpot, async (req, res) => {
  let b = req.body
  let user = req.user
  let spot = await user.createSpot({
    address: b.address,
    city: b.city,
    state: b.state,
    country: b.country,
    lat: b.lat,
    lng: b.lng,
    name: b.name,
    description: b.description,
    price: b.price
  })
  res.statusCode = 201;
  return res.json(spot)
})

const validateImg = [
  check('url')
    .exists({ checkFalsy: true })
    .withMessage('url required'),
  check('preview')
    .exists()
    .withMessage('preview required'),
  handleValidationErrors
];


router.post('/:spotId/images', requireAuth, validateImg, async (req, res) => {

  let id = req.params.spotId;
  let b = req.body;

  let count = await Spot.count({where: {
    id: id
  }})

  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Spot couldn't be found");
    err.status = 404
      return res.json({
        message: err.message,
        statusCode: err.status
        })
      }

  else {
    let spot = await Spot.findByPk(id);

    if (spot.ownerId !== req.user.id) {
      let err = new Error('Spot does not belong to current user');
      res.statusCode = 403;
      err.status = 403;
      return res.json({
        message: err.message,
        statusCode: err.status
      })
    }

    else {

      let previewCount = await SpotImage.count({
        where: {
          spotId: spot.id,
          preview: true
        }
      })

      if (previewCount > 0 && b.preview === true) {
        res.statusCode = 400;
        let err = new Error("Spot already has preview image");
        err.status = 400;
        return res.json({
          message: err.message,
          statusCode: err.status
        })
      }

      else {
        let img = await spot.createSpotImage({
          url: b.url,
          preview: b.preview
        })
        return res.json({
          id: img.id,
          url: img.url,
          preview: img.preview
        })
      }
    }
  }

})

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  let id = req.params.spotId;
  let b = req.body;

  let count = await Spot.count({where: {
    id: id
  }})

  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Spot couldn't be found");
    err.status = 404
      return res.json({
        message: err.message,
        statusCode: err.status
        })
    }

  else {

    let spot = await Spot.findByPk(id);

    if (spot.ownerId !== req.user.id) {
      let err = new Error('Spot does not belong to current user');
      res.statusCode = 403;
      err.status = 403;
      return res.json({
        message: err.message,
        statusCode: err.status
      })
    }

    else {
      try {
      await spot.update({
      address: b.address,
      city: b.city,
      state: b.state,
      country: b.country,
      lat: b.lat,
      lng: b.lng,
      name: b.name,
      description: b.description,
      price: b.price
      })
      return res.json(spot);
      }
      catch(e) {
      let err = new Error(e.errors[0].message);
      res.statusCode = 400;
      err.status = 400;
      return res.json({
        message: err.message,
        statusCode: err.status
      })
      }
    }
  }

})

router.delete('/:spotId', requireAuth, async (req, res) => {
  let id = req.params.spotId;
  let b = req.body;

  let count = await Spot.count({where: {
    id: id
  }})

  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Spot couldn't be found");
    err.status = 404
      return res.json({
        message: err.message,
        statusCode: err.status
        })
  }

  else {

    let spot = await Spot.findByPk(id);

    if (spot.ownerId !== req.user.id) {
      let err = new Error('Spot does not belong to current user');
      err.status = 403;
      res.statusCode = 403;
      return res.json({
        message: err.message,
        statusCode: err.status
      })
    }

    else {

      spot.destroy();

      return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      });
    }
  }

})

router.get('/:spotId/reviews', async (req, res) => {
  let id = req.params.spotId;

  let count = await Spot.count({where: {
    id: id
  }})

  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Spot couldn't be found");
    err.status = 404
      return res.json({
        message: err.message,
        statusCode: err.status
    })
  }

  else {
    let revs = await Review.findAll({
      where: {
        spotId: id
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"]
        }
      ]
    })
  return res.json({Reviews: revs});
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

router.post('/:spotId/reviews', requireAuth, validateRev, async (req, res) => {
  let id = req.params.spotId;
  let count = await Spot.count({where: {id: id}});
  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Spot couldn't be found");
    err.status = 404
      return res.json({
        message: err.message,
        statusCode: err.status
    })
  }
  else {
    let count2 = await Review.count({
      where: {
        spotId: id,
        userId: req.user.id
      }
    })

    if (count2 > 0) {
      res.statusCode = 403;
      let err = new Error("User already has a review for this spot");
      err.status = 403;
        return res.json({
          message: err.message,
          statusCode: err.status
      })
    }

    else {
      let rev = await req.user.createReview({
        spotId: id,
        review: req.body.review,
        stars: req.body.stars
      })
      return res.json(rev)
    }
  }
})

module.exports = router;
