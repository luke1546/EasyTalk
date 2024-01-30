import React from 'react';
import PropTypes from 'prop-types';

export const Textbox = ({ section, context1, context2, ...props }) => {
  return (
    <div
      className={'${section}-textbox'}
      {...props}
    >
      {section === 'doubleText' ? (
  <>
    <div>{context1}</div>
    <div>{context2}</div>
  </>
) : (
  <div>{context1}</div>
)}
    </div>
  );
};

Textbox.propTypes = {
  section: PropTypes.string.isRequired,
  context1: PropTypes.string.isRequired,
  context2: PropTypes.string.isRequired,
};

Textbox.defaultProps = {
  context2: null,
};