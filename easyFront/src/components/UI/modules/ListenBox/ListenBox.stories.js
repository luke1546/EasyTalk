// ListenBox.stories.js

import React from 'react';
import ListenBox from './ListenBox';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'ListenBox',
  component: ListenBox,
};

const Template = (args) => (
  <Router>
    <ListenBox {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  sentence1: {
    sentence_id: '1',
    sentence: 'This is sentence 1',
    meaning: 'Meaning 1',
    isBookmarked: false,
    audioUrl: 'audio1.mp3',
  },
  sentence2: {
    sentence_id: '2',
    sentence: 'This is sentence 2',
    meaning: 'Meaning 2',
    isBookmarked: true,
    audioUrl: 'audio2.mp3',
  },
};
