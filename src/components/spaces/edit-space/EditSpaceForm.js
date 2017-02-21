import React from 'react';
import { Link } from 'react-router-dom';
import UserList from './UserListComponent';
import MemberList from './MemberListComponent';
import './../view-space/ViewSpaces.css';

/** TODO: Break this file up into more components!
 * @description contains list of users available to add to space
 * @param router {object} provides router information passed between views
 * @param space {object} a single space to edit
 * @param creatorDetails {object} details for user that match id in space.created_by
 * @param handleInputChange {function} handles any changes to input fields, to pass to container
 * @param memberList {array} list of members added to space
 * @param handleRemoveMember {function} remove member from space
 * @param userList {array} list of users available to project, for display only
 * @param handleUserSelectChange {function} used to populate selected user
 * @param handleAddMember {function} add member to space
 * @param handleSubmit {function} submit form
 * @param handleDelete {function} delete space
 * @param selectedUser {number} id of selected user in select box  */

const EditSpaceForm = ({
  router, space, creatorDetails, handleInputChange, memberList, handleRemoveMember, userList,
  handleUserSelectChange, handleAddMember, handleSubmit, handleDelete, selectedUser
}) => {
  return (
    <div className="edit-space">
      <form>
        <header>
          { router.path === '/create' ?
            <h2>Create space{space.title ? `: ` : null } {space.title ? <em>{space.title}</em> : null }</h2> :
            <h2>Edit space: <em>{space.title}</em></h2>
          }
          { creatorDetails ? <p>Created by: {creatorDetails.first_name} {creatorDetails.last_name}</p> : null}
        </header>

        <div className="container">
          <main className="row">

            <div className="col-lg-6">
              <fieldset className="checkbox-group">
                <legend>Type of space</legend>

                <div className="form-check form-check-inline">
                  <label className="form-check-label pl-0">
                    <input
                      type="checkbox"
                      id="welcome"
                      name="type-of-space"
                      onChange={handleInputChange}
                      defaultChecked={space.welcome}/>
                    Welcome space
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      id="private"
                      name="type-of-space"
                      onChange={handleInputChange}
                      defaultChecked={space.private}/>
                    Private space
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      id="featured"
                      name="type-of-space"
                      onChange={handleInputChange}
                      defaultChecked={space.featured}/>
                    Featured space
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Details</legend>

                <div className="form-group row">
                  <label className="col-3 col-form-label" htmlFor="title">Title:</label>
                  <div className="col-9">
                    <input type="text"
                      className="form-control"
                      id="title"
                      onChange={handleInputChange}
                      value={space.title}/>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-3 col-form-label" htmlFor="description">Description:</label>
                  <div className="col-9">
                    <textarea
                      className="form-control"
                      id="description"
                      onChange={handleInputChange}
                      value={space.description}></textarea>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="col-lg-6">
              <fieldset className="member-area">
                <legend>Members</legend>
                <div className="form-group row member-list">
                  <div className="col-10">
                    {memberList && memberList.length ?
                      <MemberList
                        memberList={memberList}
                        handleRemoveMember={handleRemoveMember}/> :
                      <p className="grey-text"><em>Please add a member</em></p>
                    }
                  </div>
                </div>

                <fieldset className="add-member">
                  <legend>Add a member from the user list</legend>
                  <div className="form-group row mb-0">
                    <label className="col-2 col-form-label" htmlFor="userList">Users:</label>
                    <div className="col-10 blah">
                      {userList && userList.length ?
                        <UserList
                          userList={userList}
                          selectedUser={parseInt(selectedUser, 10)}
                          handleUserSelectChange={handleUserSelectChange}
                          handleAddMember={handleAddMember}/> :
                        <p className="grey-text mt-1"><em>No users avaliable</em></p>
                      }
                    </div>
                  </div>
                </fieldset>

              </fieldset>
            </div>

          </main>
        </div>

        <footer>
          <fieldset>
            <Link className="btn btn-primary" to={'/spaces'}>Cancel</Link>
            <button onClick={handleSubmit} className="btn btn-success float-right ml-3">Save</button>
            {space.id ? <button onClick={handleDelete} className="btn btn-danger float-right">Delete</button> : null}
          </fieldset>
        </footer>
      </form>
    </div>
  )
};

EditSpaceForm.propTypes = {
  router: React.PropTypes.object,
  space: React.PropTypes.object,
  creatorDetails: React.PropTypes.object,
  handleInputChange: React.PropTypes.func.isRequired,
  memberList:  React.PropTypes.array,
  handleRemoveMember: React.PropTypes.func.isRequired,
  userList: React.PropTypes.array,
  handleUserSelectChange: React.PropTypes.func.isRequired,
  handleAddMember: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
  selectedUser: React.PropTypes.number
};

export default EditSpaceForm
