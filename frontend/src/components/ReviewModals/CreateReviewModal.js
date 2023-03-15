import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews.js';
import './reviewModal.css'

const CreateReviewModal = ({spotId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  const [starHover, setStarHover] = useState(0);

  const handleSubmit = (e) => {
    setErrors([]);
    return dispatch(reviewActions.createReview({review, stars}, spotId))
     .then(closeModal)
     .then(history.push(`/spots/${spotId}`))
     .catch(async (res) => {
      const data = await res.json();
      console.log(data)
      if (data && data.errors) setErrors(data.errors);
    });
  }

  return (
    <div>
      <h1>How was your stay?</h1>
      <ul>
        {errors.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>

        <label>
          Review
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>

        <div>
          {[...Array(5)].map((s, i) => {
            i += 1;
            return (
              <button
              type='button'
              key={i}
              onClick={() => setStars(i)}
              onMouseEnter={() => setStarHover(i)}
              onMouseLeave={() => setStarHover(stars)}
              >
              {
                i <= (stars || starHover) ?
                <span>&#9733;</span> :
                <span>&#9734;</span>
              }
              </button>
            );
          })}
        </div>

        <button
        disabled={
        review.length < 10 ||
        stars < 1
        }
        type="submit">
          Submit Review
        </button>

      </form>
    </div>
  )
}

export default CreateReviewModal
