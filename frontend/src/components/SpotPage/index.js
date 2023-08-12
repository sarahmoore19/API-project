import { NavLink, useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews';
import ReviewCard from './ReviewCard';
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from '../ReviewModals/CreateReviewModal';
import BookingModal from '../BookingModal';
import './index.css'

function OneSpot() {

  let {id} = useParams()
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots.oneSpot);
  const reviews = useSelector(state => state.reviews.spot);

  useEffect(() => {
    dispatch(spotActions.oneSpot(id))
    dispatch(reviewActions.spotReviews(id))
  }, [dispatch])

  function hasReview() {
    for (let i = 0; i < arr.length; i++) {
      if (sessionUser && arr[i].userId == sessionUser.id) return true
    }
    return false
  }

  let arr = Object.values(reviews);
  arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (spot.id == undefined) return null;

  let imgArr = spot.SpotImages;
  let previewImage = imgArr.find(s => s.preview == true)
  if (!previewImage) previewImage = {
    preview: true,
    url: 'https://www.folklor-mersch.lu/images/sursite/Photos-Coming-Soon.jpg'
  }

  for (let i = imgArr.length; i < 5; i++) {
    imgArr.push({
      id: `sample${i}`,
      preview: false,
      url: 'https://www.folklor-mersch.lu/images/sursite/Photos-Coming-Soon.jpg'
    })
  }

  return (
    <div>

      <div className='spotContainer'>

        <h1>{spot.name}</h1>
        <h4>{spot.city}, {spot.state}, {spot.country}</h4>
        <div className='wholeImagesContainer'>
          <img height='330px' width='480px' src={previewImage.url}></img>
          <div className='FourImagesContainer'>
            {imgArr.map(i => (
              i.preview ? null :
              <img key={i.id} height='160px' width='240px' src={i.url}></img>
            ))}
          </div>
        </div>

        <div className='spotInfoContainer'>

          <div>
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p>{spot.description}</p>
          </div>

          <div className='bookingInfoContainer'>

            <div className='reviewPriceContainer'>
            <span>${spot.price}/night </span>
              {spot.numReviews > 0 ?
                <span>
                  &#9733;{spot.avgStarRating && Number(spot.avgStarRating).toFixed(1)} · {spot.numReviews} {spot.numReviews > 1 ? 'Reviews ' : 'Review '}
                </span> :
                <span>
                  &#9733;New
                </span>
              }
            </div>

              <div className='reserveButtonContainer'>
                <OpenModalButton
                buttonText='Reserve'
                modalComponent={<BookingModal spotId={id}/>}
            />
              </div>

          </div>

        </div>

      </div>

      <div>
        {
          spot.numReviews > 0 ?
          <h2>
            &#9733;{spot.avgStarRating && Number(spot.avgStarRating).toFixed(1)} · {spot.numReviews} {spot.numReviews > 1 ? 'Reviews' : 'Review'}
          </h2> :
          <h2>
            &#9733;New
          </h2>
        }
        {
          !hasReview() && sessionUser && sessionUser.id != spot.ownerId &&

            <OpenModalButton
              buttonText='Post Your Review'
              modalComponent={
              <CreateReviewModal
              spotId={id} />}
            />

        }
        {
          !arr.length && sessionUser && sessionUser.id != spot.ownerId &&
          <p>Be the first to review!</p>
        }
        {
          arr.map(o => (
          <ReviewCard
          reviewContext='spot'
          key={o.id}
          review={o}
          />
        ))
        }
      </div>
    </div>
  )
}

export default OneSpot;
