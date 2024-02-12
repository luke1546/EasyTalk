import * as React from "react";
import Button from "../atoms/Button/Button";


const DoubluBtn = ({ variant }) => {
  const handleButtonClick = (buttonName) => {
    // 버튼 클릭 시 실행되어야 할 로직을 작성
    console.log(`Button ${buttonName} clicked`);
  };

  let bookMarkBtn;

  if (variant === 'savelisten') {
    // 실제 저장 여부를 판단할 로직 작성
    const isBookMarked = true;

    // 저장이 되었으면 FBookmark, 저장이 안되었으면 bookmark 출력
    bookMarkBtn = isBookMarked ? (
      <Button name="fBookMarkBtn" onClick={() => handleButtonClick('fBookMarkBtn')} />
    ) : (
      <Button name="bookMarkBtn" onClick={() => handleButtonClick('bookMarkBtn')} />
    );
  }

  return (
    <div>
      {/* 저장-듣기 버튼 */}
      {variant === 'savelisten' && (
        <>
          {bookMarkBtn}
          <Button name="listenBtn" onClick={() => handleButtonClick('listenBtn')} />
        </>
      )}

      {/* 편집-삭제 버튼 */}
      {variant === 'editdel' && (
        <>
          <Button name="editBtn" onClick={() => handleButtonClick('editBtn')} />
          <Button name="delBtn" onClick={() => handleButtonClick('delBtn')} />
        </>
      )}
    </div>
  );
};

export default DoubluBtn;
