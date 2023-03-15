import { NavLink, useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews';
import ReviewCard from './ReviewCard';
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from '../ReviewModals/CreateReviewModal';

function OneSpot() {

  function hasReview() {
    for (let i = 0; i < arr.length; i++) {
      if (sessionUser && arr[i].userId == sessionUser.id) return true
    }
    return false
  }

  let {id} = useParams()
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots.oneSpot);
  const reviews = useSelector(state => state.reviews.spot);

  let arr = Object.values(reviews);
  arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    dispatch(spotActions.oneSpot(id))
    dispatch(reviewActions.spotReviews(id))
  }, [dispatch])

  if (spot.id == undefined) return null;

  let imgArr = spot.SpotImages;
  let previewImage = imgArr.find(s => s.preview == true)

  for (let i = imgArr.length; i < 5; i++) {
    imgArr.push({
      preview: false,
      url: 'https://www.folklor-mersch.lu/images/sursite/Photos-Coming-Soon.jpg'
    })
  }

  return (
    <div>

      <div>
        <h1>{spot.name}</h1>
        <h4>{spot.city}, {spot.state}, {spot.country}</h4>
        <div>
          <img height='350px' width='500px' src={previewImage.url}></img>
          {imgArr.map(i => (
            i.preview ? null :
            <img key={i.id} height='175px' width='250px' src={i.url}></img>
          ))}
        </div>
        <div>
          <div>
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p>{spot.description}</p>
          </div>
          <div>
          <span>${spot.price}/night </span>
          {spot.numReviews > 0 ?
            <span>
              &#9733;{spot.avgStarRating} · {spot.numReviews} {spot.numReviews > 1 ? 'Reviews ' : 'Review '}
            </span> :
            <span>
              &#9733;New
            </span>}
            <button onClick={() => window.alert('Coming soon!')}>
              Reserve
            </button>
          </div>
        </div>
      </div>

      <div>
        {
          spot.numReviews > 0 ?
          <h2>
            &#9733;{spot.avgStarRating} · {spot.numReviews} {spot.numReviews > 1 ? 'Reviews' : 'Review'}
          </h2> :
          <h2>
            &#9733;New
          </h2>
        }
        {
          !hasReview() && sessionUser && sessionUser.id != spot.ownerId &&

            <OpenModalButton
              buttonText='Post Your Review'
              modalComponent={<CreateReviewModal spotId={id} />}
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
