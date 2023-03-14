

/*
get all spots,
get spot by Id,

*/


let initialState = {
  allSpots: {},
  singleSpot: {}
}


const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    default:
      return state;
  }
};

export default spotsReducer;
