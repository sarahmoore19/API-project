import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import CreateSpot from "./components/SpotForm/CreateSpot";
import EditSpot from "./components/SpotForm/EditSpot";
import CurrentReviews from "./components/Navigation/CurrentReviews";
import CurrentSpots from "./components/Navigation/CurrentSpots";
import OneSpot from "./components/OneSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpots/>
          </Route>
          <Route path='/spots/new'>
            <CreateSpot/>
          </Route>
          <Route path='/spots/edit'>
            <EditSpot/>
          </Route>
          <Route path='/spots/current'>
             <CurrentSpots/>
          </Route>
          <Route path='/spots/:id'>
            <OneSpot/>
          </Route>
          <Route path='/reviews/current'>
            <CurrentReviews/>
          </Route>
          <Route>
            <AllSpots/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
