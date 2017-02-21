import React from 'react';

/**
 * @description contains list of users available to add to space
 * @param selectedUser {number} id of selected user in select box
 * @param userList {array} list of users available to project, for display only
 * @param handleUserSelectChange {function} used to populate selected user
 * @param handleAddMember {function} add member to space  */

const UserList = ({selectedUser, userList, handleUserSelectChange, handleAddMember}) => {
  return (
    <div>
      <select value={selectedUser ? selectedUser : 0} onChange={handleUserSelectChange} id="userList">
        {userList ?
          userList.map(({id, first_name, last_name}, index) =>
            <option key={index} value={id}>
              {`${first_name} ${last_name}`}
            </option>) :
            <option>Loading...</option>
        }
      </select>
      <button className="select-button btn btn-info ml-3" onClick={handleAddMember} type="button">Add</button>
    </div>
  )
};

// validate component input
UserList.propTypes = {
  selectedUser: React.PropTypes.number.isRequired,
  userList: React.PropTypes.array.isRequired,
  handleUserSelectChange: React.PropTypes.func.isRequired,
  handleAddMember: React.PropTypes.func.isRequired
};

export default UserList