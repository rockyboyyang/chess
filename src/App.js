import React from 'react';
import Login from './components/Login';
import GuestMenu from './components/GuestMenu'
import GameBoard from './components/GameBoard'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <h1>Chess</h1>
      <Switch>
        {/* {localStorage.Token ? (<Route path="/login"><Login /></Route>) : (<Route path="/guestMenu"><GuestMenu /></Route>)} */}
        <Route path="/login"><Login /></Route>
        <Route path="/guestMenu"><GuestMenu /></Route>
        <Route path="/gameBoard"><GameBoard /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
