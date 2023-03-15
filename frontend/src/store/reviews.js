import { csrfFetch } from './csrf';

const SPOT = 'reviews/SPOT'
const USER = 'spot/USER'

/*
get all spots,
get spot by Id,
*/

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
  console.log(data);
  dispatch(setUserReviews(data.Reviews));
  return response
};

export const spotReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);
  const data = await response.json();
  dispatch(setSpotReviews(data.Reviews));
  return response
};

export const deleteReview = () => async (dispatch) => {

};


export const createReview = () => async (dispatch) => {

};


let initialState = {
  spot: {},
  user: {}
}

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case USER:
      newState = {...state};
      newState.user = {};
      action.arr.forEach(s => newState.user[s.id] = s)
      return newState;
    case SPOT:
      newState = {...state};
      newState.spot = {};
      action.arr.forEach(s => newState.spot[s.id] = s)
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
