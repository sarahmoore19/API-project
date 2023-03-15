import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ReviewCard({review}) {
  return (
    <div>
      <p>{review.User.firstName}</p>
      <p>{new Date(review.createdAt).toDateString()}</p>
      <p>{review.review}</p>
    </div>
  )
}

export default ReviewCard;
