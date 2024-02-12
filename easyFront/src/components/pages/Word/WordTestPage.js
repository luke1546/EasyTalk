
import React from 'react';
import { Route, Switch, useNavigate } from 'react-router-dom';
import Textbox from '../../UI/atoms/Text/Textbox';

const WordTestPage = () => {

  return (
    <Textbox section={'singleText'} context1={'단어 테스트'} />
    );
};

export default WordTestPage;