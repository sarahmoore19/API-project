import { csrfFetch } from './csrf';

const ALL = 'spots/ALL'
const ONE = 'spots/ONE'
const CURRENT = 'spots/CURRENT'

/*
get all spots,
get spot by Id,

*/

const setAllSpots = (arr) => {
  return {
    type: ALL,
    arr
  };
};

const setOneSpot = (id) => {
  return {
    type: ONE,
    id
  };
};

const setCurrentSpots = (userId) => {
  return {
    type: ONE,
    userId
  };
};

export const allSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  console.log(data)
  dispatch(setAllSpots(data.Spots));
  return response
};

export const oneSpot = (id) => async (dispatch) => {
const response = await csrfFetch(`/api/spots/${id}`);
  const data = await response.json();
  return response
};

export const currentSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  const data = await response.json();

  return response
};

export const deleteSpot = () => async (dispatch) => {

};

export const updateSpots = () => async (dispatch) => {

};

export const createSpots = () => async (dispatch) => {

};


let initialState = {
  allSpots: {},
  oneSpot: {}
}


const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    default:
      return state;
    case ALL:
      newState = Object.assign({}, state);
      action.arr.forEach(s => newState.allSpots[s.id] = s)
      return newState;
  }
};

export default spotsReducer;
