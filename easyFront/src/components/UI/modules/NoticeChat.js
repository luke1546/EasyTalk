import styled from "styled-components";
import Textbox from "../atoms/Text/Textbox";

const StyledNoticeChat = styled.span`
  border-style: solid;
  border-width: 1px;
  border-radius: 10%;
  border-color: #8382ff;
`;

const NoticeChat = () => {
  const 관리자여부 = false;

  if (관리자여부 === true) {
    return (
      <div>
        <span>공지삭제</span>
        <StyledNoticeChat>
          <Textbox section="noticeText" context1="텍스트 들어갈 내용" />
        </StyledNoticeChat>
      </div>
    );
  }
  return (
    <div>
      <StyledNoticeChat>
        <Textbox section="noticeText" context1="공지사항 어쩌구" />
      </StyledNoticeChat>
    </div>
  );
};

export default NoticeChat;
