const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const { where } = require('sequelize');

async function addImg(bookings) {
  let bookingObjs = [];
  for (let i = 0; i < bookings.length; i++) {
   bookingObjs.push(bookings[i].toJSON())
  }
  for (let i = 0; i < bookingObjs.length; i++) {

    let booking = bookingObjs[i];

    try {
    let img = await SpotImage.findOne({
      where: {
        spotId: booking.spotId,
        preview: true
      }
    })
    booking.Spot.previewImage = img.toJSON().url;
   }
   catch {
    booking.Spot.previewImage = null;
   }

  }
  return bookingObjs
}

router.get('/current', requireAuth, async (req, res) => {
  let bookings = await req.user.getBookings({
    include: {
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'description']
      }
    }
  })
  bookings = await addImg(bookings)
  res.json({Bookings: bookings})
})

const validateDate = [
  check('startDate')
    .exists()
    .isDate()
    .withMessage('startDate is required'),
  check('endDate')
    .exists()
    .isDate()
    .withMessage('endDate is required'),
  handleValidationErrors
];

router.put('/:bookingId', requireAuth, validateDate, async (req, res) => {
  let id = req.params.bookingId;
  let count = await Booking.count({where: {id: id}});
  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Booking couldn't be found");
    err.status = 404
      return res.json({
        message: err.message,
        statusCode: err.status
    })
  }
  else {
    let booking = await Booking.findByPk(id);
    if (req.user.id !== booking.userId) {
      let err = new Error('Booking must belong to current user');
      err.status = 403;
      res.statusCode = 403;
      return res.json({
        message: err.message,
        statusCode: err.status
      })
    }
    else {
      let b = req.body
      let startNum = new Date(b.startDate).getTime()
      let endNum = new Date(b.endDate).getTime()
      if (startNum >= endNum) {
        let err = new Error('Validation Error');
        err.status = 400;
        res.statusCode = 400;
        return res.json({
        message: err.message,
        statusCode: err.status,
        error: {
          endDate: "endDate cannot come before startDate"
        }
      })
      }
      else {
        if (endNum <= Date.now()) {
          let err = new Error('Past bookings cannot be modified');
              err.status = 403;
              res.statusCode = 403;
              return res.json({
              message: err.message,
              statusCode: err.status,
            })
        }
        else {
          let spot = await Spot.findByPk(booking.spotId);
          let bookings = await spot.getBookings()
          let errors = {}
          for (let i = 0; i < bookings.length; i++) {
            let book = bookings[i];
            let bookStart = new Date(book.startDate).getTime();
            let bookEnd = new Date(book.endDate).getTime();
            if (bookStart >= startNum && bookStart <= endNum) errors.startDate = "Start date conflicts with an existing booking";
            else if (bookEnd >= startNum && bookEnd <= endNum) errors.endDate = "End date conflicts with an existing booking"
          }
          if (Object.keys(errors).length > 0) {
            let err = new Error('Sorry, this spot is already booked for the specified dates"');
              err.status = 400;
              res.statusCode = 400;
              return res.json({
              message: err.message,
              statusCode: err.status,
              errors: errors
            })
          }
          else {
            let newBooking = await booking.update({
              startDate: new Date(b.startDate),
              endDate: new Date(b.endDate),
            })
            res.json(newBooking)
          }
        }
      }
    }
  }
})

module.exports = router;
