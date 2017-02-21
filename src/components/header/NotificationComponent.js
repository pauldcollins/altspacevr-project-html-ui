import React from 'react';

/**
 * @description alert banner for any notifications
 * @param title {string} title passed in from container component
 * @param message {string} message to accompany alert  */

const Notification = ({ title, message }) => {
  return (
    <aside role="alert" className="altspace-alert alert alert-success">
      <h2>{ title }</h2>
      <p>{ message } </p>
    </aside>
  )
};

// validate component input
Notification.propTypes = {
  title: React.PropTypes.string.isRequired,
  message: React.PropTypes.string
};

export default Notification
