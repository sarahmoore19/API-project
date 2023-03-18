import { csrfFetch } from './csrf';

const ALL = 'spots/ALL';
const ONE = 'spots/ONE';
const DELETE = 'spots/DELETE';
const CREATE = 'spots/CREATE';
const ADDIMG = 'spots/ADDIMG';

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

const deleteOne = (id) => {
  return {
    type: DELETE,
    id
  };
};

const createOne = (spot) => {
  return {
    type: CREATE,
    spot
  };
};


export const allSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  dispatch(setAllSpots(data.Spots));
  return response
};

export const oneSpot = (spotId) => async (dispatch) => {
const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(setOneSpot(data));
  return response
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  dispatch(deleteOne(spotId))
  return response
};

export const updateSpot = (spotId, details) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(details)
  })
  if (response.ok) {
  const data = await response.json();
  return data;
  }
};

export const createSpot = (details) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    body:  JSON.stringify(details)
  })
  if (response.ok) {
  const data = await response.json();
  dispatch(oneSpot(data.id));
  return data
  }
};

export const addSpotImage = (spotId, details) => async () => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(details)
  })
  const data = await response.json();
  return data
};

let initialState = {
  allSpots: {},
  oneSpot: {}
}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL:
      let newState1 = {...state, oneSpot: {...state.oneSpot}, allSpots: {}};
      action.arr.forEach(s => newState1.allSpots[s.id] = s);
      return newState1;
    case ONE:
      let newState2 = {...state, allSpots: {...state.allSpots}, oneSpot: {}};
      let oneSpot = {...action.obj};
      newState2.oneSpot = oneSpot
      return newState2;
    case DELETE: {
      let newState3= {...state, oneSpot: {...state.oneSpot}, allSpots: {...state.allSpots}};
      delete newState3.allSpots[action.id];
      return newState3;
    }
    case CREATE: {
      let newState3= {...state, oneSpot: {...state.oneSpot}, allSpots: {...state.allSpots}};
      newState3.allSpots[action.spot.id] = action.spot
      return newState3;
    }
    default:
      return state;
  }
};

export default spotsReducer;
