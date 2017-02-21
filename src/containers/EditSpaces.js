// react
import React, { Component } from 'react';

// data
import data from './../data/Data';

// components
import Header from '../components/header/Header';
import { EditSpaceForm } from './../components/spaces';

// helpers
import {
    cloneObject,
    filterUsers,
    filterMembers,
    addItem,
    removeItemById
} from './../helpers';

/**
 * @description edit spaces container, used for both editing and creating */

class EditSpacesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space: null,
      users: null,
      memberList: null,
      userList: null,
      selectedUser: null,
      creatorDetails: null
    };

    // bindings for all methods passed down as props
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserSelectChange = this.handleUserSelectChange.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleRemoveMember = this.handleRemoveMember.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // if has id in route params, get data for space
    if (this.props.match.params.id) {
      this.getData();
    }

    // if route path is 'create', call createSpace
    if (this.props.match.path === '/create') {
      this.createSpace();
    }
  }

  // get data for editing existing space
  getData() {
    const { User, Space } = data;

    // get space and users
    Promise.all([Space.getById(this.props.match.params.id), User.getAll()])
      .then((results) => {
        // set state with space and users
        this.setState({
          space: results[0],
          users: results[1]
        },

        // update member list
        () => {
          this.updateMemberList();
          this.setState({
            creatorDetails: results[0].created_by ? this.getUserById() : this.getAdminUser()
          })
        });
      });
  }

  // create new space
  createSpace() {
    const { User } = data;

    // get all users
    User.getAll()
      .then((results) => {

        // set state with space and add users from database
        this.setState({
          users: results,
          space: {
            created_by: null,
            description: '',
            featured: false,
            members: null,
            "private": false,
            title: '',
            welcome: false
          }
        },

        // once state is set, use callback
        () => {
          this.updateMemberList();

          // we need to wait for state to load before updating 'created by' details
          const spaceUpdated = Object.assign({}, this.state.space, {created_by: this.state.users ? this.getAdminUser().id : null});
          this.setState({
            space: spaceUpdated,
            creatorDetails: results[0].created_by ? this.getUserById() : this.getAdminUser()
          });
        });
      });
  }

  // get user object from list by id
  getUserById() {
    if (this.state.users) {
      return this.state.users.find(({id}) => id === this.state.space.created_by);
    }
  }

  // get admin user based on flag
  getAdminUser() {
    if (this.state.users) {
      const admin = this.state.users.find(item => item.admin);
      return admin ? admin : null;
    }
  }

  // update the user list and member lists
  // for display on page only
  updateMemberList() {
    // create copy of user list to avoid mutating
    const newState = cloneObject(this.state);

    // if members already exist, remove them from user list
    if (newState.space.members !== null) {
      newState.userList = filterUsers(newState.users, newState.space.members);
      newState.memberList = filterMembers(newState.users, newState.space.members);
    // if no members currently exist, add all users to userList
    } else {
      newState.userList = newState.users;
    }

    // set selectUser state to first in list if current one removed
    newState.selectedUser = newState.userList[0] ? newState.userList[0].id : null;

    this.setState({ ...newState });
  }

  /** @description any interaction in inputs calls this function and returns value
   * @param target {object} used get value entered into input */

  handleInputChange({target}) {
    const newState = cloneObject(this.state);
    let { space } = newState;

    // check for whether input is checkbox or standard input for required key
    const newInputValue = (target.type === 'checkbox') ? target.checked : target.value;

    // change value of key that matches input id
    space[target.id] = newInputValue;

    this.setState({ ...newState });
  }

  /** @description user select box changes only
   * @param target {object} used to get value of currently selected item */

  handleUserSelectChange({target}) {
    const newState = cloneObject(this.state);
    newState.selectedUser = target.value;
    this.setState({ ...newState });
  }

  // add member by id into space object
  // also updated user and member lists for display
  handleAddMember() {
    const newState = cloneObject(this.state);
    let { space, selectedUser } = newState;

    // if members is null, make empty array, so we can push new values to it
    if (space.members === null) {
      space.members = [];
    }

    // add new item to the members array
    space.members = addItem(space.members, parseInt(selectedUser, 10));

    this.setState(
        { ...newState },
        // callback - wait for state to update before updating member list
        () => this.updateMemberList()
    );
  }

  /** @description remove member by id from space object, also updated user and member lists for display
   * @param target {object} used to get value of data attribute */

  handleRemoveMember({target}) {
    const newState = cloneObject(this.state);
    let { space } = newState;

    // get member id from button clicked and remove from array
    const memberId = target.getAttribute('data-user-id');
    space.members = removeItemById(space.members, parseInt(memberId, 10));

    // if members array is empty, set back to null to send correct payload back to server
    if (space.members.length < 0) {
      space.members = null;
    }

    this.setState(
        { ...newState },
        // callback - wait for state to update before updating member list
        () => this.updateMemberList()
    );
  }

  /** @description submit function, push data back to (mock) server
   * @param event {object} used to prevent default submit */

  handleSubmit(event) {
    event.preventDefault();
    const {space} = this.state;

    // if space contains and id, save by id
    if (space.id) {
      return data.Space
        .updateById(parseInt(space.id, 10), space)
        .then(() => {
          // change location and provide message for notification banner
          this.props.push('/spaces',
            {notification:
              {
                title: 'Congratulations',
                message: 'You have updated your space. We love your work!'
              }
            });
        });
    }

    // if space has no id, create a new space
    data.Space
      .create(space)
      .then(() => {
        // change location and provide message for notification banner
        this.props.push('/spaces',
            {notification:
            {
              title: 'Congratulations',
              message: 'You have created a new space. We look forward to seeing where you take it!'
            }
            });
      });
  }

  /** @description delete current space
   * @param event {object} used to prevent default submit */

  handleDelete(event) {
    event.preventDefault();
    const { space } = this.state;

    data.Space
      .deleteById(space.id)
      .then(() => {
        // change location and provide message for notification banner
        this.props.push('/spaces',
          {notification:
            {
              title: 'Your space has been deleted',
              message: 'Please feel free to create another'
            }
          });
      });
  }

  // render content method
  renderSpace() {
    return (
      <EditSpaceForm
        {...this.state}
        router={ this.props.match }
        handleInputChange={this.handleInputChange}
        handleUserSelectChange={this.handleUserSelectChange}
        handleAddMember={this.handleAddMember}
        handleRemoveMember={this.handleRemoveMember}
        handleDelete={this.handleDelete}
        handleSubmit={this.handleSubmit}/>
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
        {this.state.space ? this.renderSpace() : this.renderNoneFound()}
      </div>
    )
  }
}

export default EditSpacesContainer;
