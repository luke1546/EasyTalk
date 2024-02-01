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
      <div className="singleInput">
        <input id="singleInput" type="text" {...props} />
      </div>
    );
  }

  if (props.name === "doubleInput") {
    return (
      <div className="doubleInput">
        <input id="doubleInput" type="text" {...props} />
        <input id="doubleInput" type="text" {...props} />
      </div>
    );
  }
}

export default Input;