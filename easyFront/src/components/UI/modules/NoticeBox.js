import styled from "styled-components";
import Textbox from "../atoms/Text/Textbox";
import Icon from "../atoms/Icon/Icon";

const StyledNoticeBox = styled.div`
  padding: 2%;
  border-style: solid;
  border-width: 1px;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  border-color: #8382ff;
`;

const NoticeBox = () => {
  return (
    <StyledNoticeBox>
      <Icon name="noticeIcon" color="#8382ff" />
      <Textbox section="singleText" context1="가져올텍스트" />
    </StyledNoticeBox>
  );
};

export default NoticeBox;
