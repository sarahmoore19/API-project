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

const setOneSpot = (obj) => {
  return {
    type: ONE,
    obj
  };
};

export const allSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  dispatch(setAllSpots(data.Spots));
  return response
};

export const oneSpot = (id) => async (dispatch) => {
const response = await csrfFetch(`/api/spots/${id}`);
  const data = await response.json();
  dispatch(setOneSpot(data));
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
    case ALL:
      newState = {...state};
      newState.allSpots = {};
      action.arr.forEach(s => newState.allSpots[s.id] = s)
      return newState;
    case ONE:
      newState = {...state, oneSpot: {}};
      newState.oneSpot = action.obj
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
