import * as React from "react";

const Input = (props) => {
  if (props.name === "searchInput") {
    return (
      <div className="searchInput">
        <input id="searchInput" type="text" {...props} />
      </div>
    );
  }

  if (props.name === "singleInput") {
    return (
      <span className="singleInput">
        <input id="singleInput" type="text" {...props} />
      </span>
    );
  }

  if (props.name === "doubleInput") {
    const { placeholder1, placeholder2, restProps } = props;
    return (
      <div className="doubleInput">
        <input id="doubleInput" type="text" placeholder={placeholder1} {...restProps} />
        <input id="doubleInput" type="text" placeholder={placeholder2} {...restProps} />
      </div>
    );
  }
};

export default Input;
