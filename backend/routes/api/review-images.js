const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize } = require('../../db/models');
const Op = sequelize.Op;
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.delete('/:imageId', requireAuth, async (req, res) => {
  let id = req.params.imageId;

  let count = await ReviewImage.count({
    where: {
      id: id
    }
  })

  if (count < 1) {
    res.statusCode = 404;
    let err = new Error("Review image couldn't be found");
    err.status = 404;
      res.json({
        message: err.message,
        statusCode: err.status
    })
  }

  else {
    let img = await ReviewImage.findByPk(id);
    let rev = await Review.findByPk(img.reviewId)
    if (rev.userId !== req.user.id) {

      let err = new Error('Review does not belong to current user');
      err.status = 401;
      res.json({
        message: err.message,
        statusCode: err.status
      })
    }

    else {
      img.destroy();
      res.json({
        message: "Successfully Deleted",
        statusCode: 200
      });
    }
  }
})

module.exports = router;
