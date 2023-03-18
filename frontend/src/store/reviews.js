import { csrfFetch } from './csrf';
import * as spotActions from './spots'

const SPOT = 'reviews/SPOT'
const USER = 'spot/USER'

const setSpotReviews = (arr) => {
  return {
    type: SPOT,
    arr
  };
};

const setUserReviews = (arr) => {
  return {
    type: USER,
    arr
  };
};

export const userReviews = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current');
  const data = await response.json();
  dispatch(setUserReviews(data.Reviews));
  return response
};

export const spotReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);
  const data = await response.json();
  dispatch(setSpotReviews(data.Reviews));
  return response
};

export const deleteReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  dispatch(spotReviews(review.spotId));
  dispatch(spotActions.oneSpot(review.spotId))
  return response
};

export const createReview = (rev, spotId) => async (dispatch) => {
  const {review, stars} = rev;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body:  JSON.stringify({
      stars,
      review,
    })
  });
  const data = await response.json();
  dispatch(spotReviews(spotId));
  dispatch(spotActions.oneSpot(spotId))
  return response
};

let initialState = {
  spot: {},
  user: {}
}

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case USER:
      newState = {...state, spot: {...state.spot}, user: {}};
      action.arr.forEach(s => newState.user[s.id] = s)
      return newState;
    case SPOT:
      newState = {...state, user: {...state.user}, spot: {}};
      action.arr.forEach(s => newState.spot[s.id] = s)
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
