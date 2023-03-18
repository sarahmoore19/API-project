import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../ReviewModals/DeleteModal';
import * as reviewActions from '../../store/reviews'
import * as spotActions from '../../store/spots'

function ReviewCard({review, reviewContext}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  return (
    <div>
      <p>{reviewContext == 'spot' ? review.User.firstName : review.Spot.name}</p>
      <p>{`${new Date(review.createdAt).toString().split(' ')[1]} ${new Date(review.createdAt).getFullYear()}`}</p>
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
        <OpenModalButton
          buttonText='Delete'
          modalComponent={
          <DeleteModal
          review={review}
          spot={null}
          deleteContext='review' />}
        />
      }
    </div>
  )
}

export default ReviewCard;
