// FeedBox.stories.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FeedBox from './FeedBox';

export default {
  title: 'UI/ex/FeedBox',
  component: FeedBox,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};
const Template = (args) => <FeedBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  userId: 1,
  feedId: 1,
  profileImg: 'https://placekitten.com/50/50', // Replace with the actual image URL
  userName: 'John Doe',
  isLiked: false,
  likeCount: 10,
  commentCount: 5,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  createdDate: '2022-01-01',
};
