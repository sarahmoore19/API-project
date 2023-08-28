import { csrfFetch } from './csrf';

const SPOT = 'bookings/SPOT';
const USER = 'bookings/USER';

const spotBookings1 = (obj) => {
  return {
    type: SPOT,
    obj
  };
};

const userBookings1 = (obj) => {
  return {
    type: USER,
    obj
  };
};

export const spotBookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  const data = await response.json();
  dispatch(spotBookings1(data));
  return response
};

export const userBookings = () => async (dispatch) => {
const response = await csrfFetch(`/api/bookings/current`);
  const data = await response.json();
  dispatch(userBookings1(data));
  return response
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  if (response.ok) {
     dispatch(userBookings())
    }
  return data
};

export const createBooking = (details, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    body:  JSON.stringify(details)
  })
  const data = await response.json();
  if (response.ok) {
  // dispatch(createBooking(data.id));
  }
  return data
};

let initialState = {
  spotBookings: {},
  userBookings: {}
}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPOT:
      let newState1 = { userBookings: {...state.userBookings}, spotBookings: {}};
      action.obj.Bookings.forEach(b => newState1.spotBookings[b.id] = b);
      return newState1;
    case USER:
      let newState2 = { spotBookings: {...state.spotBookings}, userBookings: {}};
      action.obj.Bookings.forEach(b => newState2.userBookings[b.id] = b);
      return newState2;
    default:
      return state;
  }
};

export default bookingsReducer;
