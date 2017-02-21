// react
import React, { Component } from 'react';

// data
import data from './../data/Data';

// components
import Header from '../components/header/Header';
import Notification from '../components/header/NotificationComponent';
import { SpacesViewList } from './../components/spaces';

// helpers
import {
  cloneObject,
  removeItemById
} from './../helpers';

/**
 * @description view spaces container
 * users can navigate to edit and create pages
 * users can also delete spaces from here */

class ViewSpacesContainer extends Component {
  constructor(props) {
    super(props);
    const passedState = this.props.location.state;

    // load state and check for any notifications passed in
    this.state = {
      spaces: null,
      notification: passedState ? passedState.notification : null
    };

    // bindings for all methods passed down as props
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  // get data for displaying all spaces
  getData() {
    const { User, Space } = data;

    Promise.all([User.getAll(), Space.getAll()]).then((results) => {
      const usersArray = results[0];
      const spacesArray = results[1];

      // merge user object that matches the created_by id into each spaces object
      const spacesMerged = spacesArray.map(space => {
        return Object.assign(space, {
          user: usersArray.find(({id}) => id === space.created_by)
        })
      });

      // set state with new spaces array
      this.setState({spaces: spacesMerged});
    });
  }

  /** @description delete a single space
  * @param event {object} used to prevent default behaviour
  * also used to get id of button clicked */

  handleDelete(event) {
    event.preventDefault();
    const newState = cloneObject(this.state);
    let { spaces } = newState;

    const spaceId = event.target.getAttribute('data-space-id');

    data.Space
      .deleteById(spaceId)
      .then(() => {
        newState.spaces = removeItemById(spaces, parseInt(spaceId, 10));
        this.setState({...newState});
      });
  }

  // render content method
  renderSpace() {
    return (
      <SpacesViewList
        spaces={this.state.spaces}
        handleDelete={this.handleDelete}/>
    )
  }

  // render notification method
  renderNotification() {
    return (
      <Notification
          { ...this.state.notification }/>
    )
  }

  // fallback if no data found
  renderNoneFound() {
    return (
      <h1>No results to show!</h1>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.notification ? this.renderNotification() : null}
        {this.state.spaces ? this.renderSpace() : this.renderNoneFound()}
      </div>
    )
  }
}

export default ViewSpacesContainer;
