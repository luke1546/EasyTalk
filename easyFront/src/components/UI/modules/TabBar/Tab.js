// Tab.js

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tab = ({ label, to, onClick, className }) => {
  return (
    <Link to={to} className={`atom-tab ${className}`} onClick={onClick}>
      {label}
    </Link>
  );
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Tab;
