import * as React from "react";
import styled from "styled-components";

const Label = (props) => {
    var showlabel = ''
    if (props.name === "searchInput") {
        showlabel = '검색어'

    return (
        <div className="Label">
            <label for="inputLabel">{showlabel}을/를 입력하세요.</label>
        </div>
        );
    }
  }
  
  export default Label;