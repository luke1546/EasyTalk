// DropDown.stories.js

import React from 'react';
import DropDown from './DropDown';

export default {
  title: 'UI/ex/DropDown',
  component: DropDown,
};

const Template = (args) => <DropDown {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  defaultOption: 'Option 1',
};

export const CustomDefault = Template.bind({});
CustomDefault.args = {
  options: ['Option A', 'Option B', 'Option C'],
  defaultOption: 'Option B',
};
