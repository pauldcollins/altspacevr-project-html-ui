import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

/**
 * @description component for viewing a space, repeats for each space
 * @param title {string} contains title of space
 * @param user {object} contains created_by user details
 * @param id {number} unique id for space
 * @param handleDelete {function} passed into handle deleting of each space  */

const SpaceViewItem = ({title, user, id, handleDelete}) => {
  return (
    <article className="card col">
      <header className="card-title">
        <h2>
          <strong>{title}</strong>
          <div className="subtext"><em>created by</em> {user.first_name} {user.last_name}</div>
        </h2>
      </header>

      <div className="card-block">
        <main className="card-text">
          <p>Welcome to Altspace! Use this space to get acquainted with the interface</p>
        </main>

        <footer className="text-right">
          <button onClick={handleDelete} data-space-id={id} className="btn btn-danger">Delete</button>
          <Link className="btn btn-primary" to={`/edit/${id}`}>Edit</Link>
        </footer>
      </div>
    </article>
  )
}

// validate component input
SpaceViewItem.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired
  }),
  handleDelete: React.PropTypes.func.isRequired,
  id: React.PropTypes.number.isRequired
};

export default SpaceViewItem