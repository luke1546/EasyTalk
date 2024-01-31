import React from 'react';
import PropTypes from 'prop-types';
import GroupHomePage from "../../pages/Group/GroupHomePage";
import GroupInvitePage from "../../pages/Group/GroupInvitePage";
import GroupRankPage from "../../pages/Group/GroupRankPage";
import GroupMessagePage from "../../pages/Group/GroupMessagePage";
import Button from "../atoms/Button/Button";
import { Link } from "react-router-dom";

const Tapbar = ({ func, ...props }) => {
  return (
    <div className={'${func}-tap-bar'} {...props}>
      {func === 'group' ? (
        <>
          <Button name='basicBtn' text="홈"></Button>
          <Button name='basicBtn' text="출석부"></Button>
          <Button name='basicBtn' text="랭킹"></Button>
          <Button name='basicBtn' text="채팅"></Button>
        </>
      ) : (
        <>
          <Button name='basicBtn' text="노래"></Button>
          <Button name='basicBtn' text="단어"></Button>
          <Button name='basicBtn' text="문장"></Button>
        </>
      )}
    </div>
  );
};

Tapbar.propTypes = {
  func: PropTypes.string.isRequired,
};

export default Tapbar;