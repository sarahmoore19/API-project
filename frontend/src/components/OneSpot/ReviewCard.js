import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ReviewCard({review, reviewContext}) {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div>
      <p>{reviewContext == 'spot' ? review.User.firstName : review.Spot.name}</p>
      <p>{new Date(review.createdAt).toDateString()}</p>
      <p>{review.review}</p>
      {
        sessionUser &&
        review.userId == sessionUser.id &&
        reviewContext == 'user' &&
        <button>Update</button>
      }
      {
        sessionUser &&
        review.userId == sessionUser.id &&
        <button>Delete</button>
      }
    </div>
  )
}

export default ReviewCard;
