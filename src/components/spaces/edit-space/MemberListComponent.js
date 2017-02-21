import React from 'react';

/**
 * @description contains list of users available to add to space
 * @param memberList {array} list of members added to project, for display only
 * @param handleRemoveMember {function} remove member from space  */

const MemberList = ({memberList, handleRemoveMember}) => {
  return (
    <div>
      <ul>
        {memberList ?
          memberList.map(({id, first_name, last_name}, index) =>
            <li key={index} value={id}>
              <button className="btn btn-link mr-2 p-0" onClick={handleRemoveMember} type="button">
                <i className="remove-link fa fa-window-close" aria-hidden="true" data-user-id={id}></i>
                <span className="sr-only">Remove</span>
              </button>
              {`${first_name} ${last_name}`}
            </li>) :
            <li>Please add a member to the space</li>
        }
      </ul>
    </div>
  )
};

// validate component input
MemberList.propTypes = {
  memberList: React.PropTypes.array.isRequired,
  handleRemoveMember: React.PropTypes.func.isRequired
};

export default MemberList
