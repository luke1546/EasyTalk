import React from 'react';
import ListBox from "./ListBox";

const YourComponent = () => {
  const textArray = [
    '첫 번째 텍스트',
    '두 번째 텍스트',
    '세 번째 텍스트',
    '네 번째 텍스트',
    '다섯 번째 텍스트',
  ];

  return (
    <div>
      <ListBox textArray={textArray} />
    </div>
  );
};

export default YourComponent;