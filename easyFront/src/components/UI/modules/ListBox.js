import React from 'react';
import Textbox from '../atoms/Text/Textbox';


const ListBox = ({ textArray }) => {
  return (
    <div>
      {textArray.map((text, index) => (
        <React.Fragment key={index}>
          <Textbox section="doubleText" context1={text} context2={index < textArray.length - 1 ? null : ''} />
          {index < textArray.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListBox;