import spotsReducer from "./spots";

/*
get all reviews,
get review by spot,
*/

let initialState = {
  spot: {},
  user: {}
}

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    default:
      return state;
  }
};

export default reviewsReducer;
