import * as React from "react";
import Button from "../atoms/Button/Button";

const TripleBtn = ({ name, text }) => {
  const handleButtonClick = (buttonInfo) => {
    // 버튼 클릭 시 실행되어야 할 로직을 작성
    console.log(`Button ${buttonInfo.name} clicked. Text: ${buttonInfo.text}`);
  };

  let bookMarkBtn;

  // 실제 저장 여부를 판단할 로직 작성
  const isBookMarked = true;

  // 저장이 되었으면 FBookmark, 저장이 안되었으면 bookmark 출력
  bookMarkBtn = isBookMarked ? (
    <Button name="fBookMarkBtn" text="제거하기" onClick={() => handleButtonClick({ name: 'fBookMarkBtn', text: '제거하기' })} />
  ) : (
    <Button name="bookMarkBtn" text="저장하기" onClick={() => handleButtonClick({ name: 'bookMarkBtn', text: '저장하기' })} />
  );

  return (
    <div>
      <div>
        {bookMarkBtn}
        <Button name="shareBtn" text="공유하기" onClick={() => handleButtonClick({ name: 'shareBtn', text: '공유하기' })} />
        <Button name="micCircleBtn" text="시험보기" onClick={() => handleButtonClick({ name: 'micCircleBtn', text: '시험보기' })} />
      </div>
      <div>
        {/* text.props 해서 출력해보기 */}
      </div>
    </div>
  );
};

export default TripleBtn;