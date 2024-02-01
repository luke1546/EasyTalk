import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const Textbox = ({ section, context1, context2, ...props }) => {
  return (
    <span className={"${section}-textbox"} {...props}>
      {section === "doubleText" ? (
        <>
          <span>{context1}</span>
          <span>{context2}</span>
        </>
      ) : (
        <span>{context1}</span>
      )}
    </span>
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

export default Textbox;
