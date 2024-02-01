// WordBox.stories.js

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import WordBox from './WordBox';

export default {
  title: 'UI/ex/WordBox',
  component: WordBox,
};

const Template = (args) => (
  <MemoryRouter>
    <WordBox {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  word: 'Example',
  meaning: 'An illustrative instance',
};
