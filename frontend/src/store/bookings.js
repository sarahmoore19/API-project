import { csrfFetch } from './csrf';

const SPOT = 'bookings/SPOT';
const USER = 'bookings/USER';

const spotBookings1 = (arr) => {
  return {
    type: SPOT,
    arr
  };
};

const userBookings1 = (obj) => {
  return {
    type: USER,
    obj
  };
};

export const spotBookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/${spotId}/bookings`);
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

// export const deleteBooking = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: 'DELETE'
//   });
//   const data = await response.json();
//   dispatch(deleteBooking1(spotId))
//   return response
// };

// export const updateBooking = (spotId, details) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: 'PUT',
//     body: JSON.stringify(details)
//   })
//   if (response.ok) {
//   const data = await response.json();
//   return data;
//   }
// };

// export const createBooking = (details) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots`, {
//     method: 'POST',
//     body:  JSON.stringify(details)
//   })
//   if (response.ok) {
//   const data = await response.json();
//   dispatch(createBooking(data.id));
//   return data
//   }
// };

let initialState = {
  spotBookings: {},
  userBookings: {}
}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPOT:
      let newState1 = { userBookings: {...state.userBookings}, spotBookings: {}};
      action.arr.forEach(b => newState1.spotBooking[b.id] = b);
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
