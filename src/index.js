// React library
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

// containers
import ViewSpacesContainer from './containers/ViewSpaces';
import EditSpacesContainer from './containers/EditSpaces';

// lib
import './lib/css/App.css';

// router header
ReactDOM.render(
  <Router>
    <div className="container">
      <Route exact path="/" component={ViewSpacesContainer}/>
      <Route exact path="/spaces" component={ViewSpacesContainer}/>
      <Route exact path="/edit/:id" component={EditSpacesContainer}/>
      <Route path="/create" component={EditSpacesContainer}/>
    </div>
  </Router>,
  document.getElementById('root')
);