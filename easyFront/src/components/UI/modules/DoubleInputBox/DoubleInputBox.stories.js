// DoubleInputBox.stories.js

import React, { useState } from 'react';
import DoubleInputBox from './DoubleInputBox';

export default {
  title: 'UI/ex/DoubleInputBox',
  component: DoubleInputBox,
};

const Template = (args) => {
  const [password, setPassword] = useState('');

  return <DoubleInputBox {...args} password={password} onPasswordChange={setPassword} />;
};

export const Default = Template.bind({});
Default.args = {};
