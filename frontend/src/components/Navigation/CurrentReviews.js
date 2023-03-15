import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import React, { useEffect, useState } from 'react'
import ReviewCard from '../SpotPage/ReviewCard';


function CurrentReviews() {
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.reviews.user);
  let arr = Object.values(reviews);
  arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    dispatch(reviewActions.userReviews())
  }, [dispatch])

  return (
    <div>
    <h2>Manage Reviews</h2>
    {
      arr.map(o => (
        <ReviewCard
        reviewContext='user'
        key={o.id}
        review={o}
      />
      ))
    }
    </div>
  )
}

export default CurrentReviews;
