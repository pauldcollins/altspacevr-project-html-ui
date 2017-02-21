import React from 'react'
import { Link } from 'react-router-dom';
import altspaceLogo from './../../lib/images/AltspaceVR@2x.png';

/**
 * @description header component used across all pages
 * @param altspaceLogo {image} logo imported into file */

const Header = () => {
  return (
    <header className="altspace-header">
      <p className="altspace-logo"><img src={ altspaceLogo } alt=""/></p>
      <h1>Spaces Admin</h1>
      <Link className="btn btn-success create-button" to={'/create'}>Create space</Link>
    </header>
  )
};

export default Header
