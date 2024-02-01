// EditFeedBox.stories.js

import React from 'react';
import EditFeedBox from './EditFeedBox';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'UI/ex/EditFeedBox',
  component: EditFeedBox,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};

const Template = (args) => <EditFeedBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  feedId: 'example-feed-id',
  initialContent: 'Example initial content',
  onCancel: () => console.log('Cancel clicked'), // 취소 버튼 클릭 시의 동작을 여기에 추가
  profileImg: 'https://placekitten.com/50/50', // Replace with the actual image URL
  userName: 'John Doe',
  isLiked: false,
  likes: 10,
  commentCount: 5,
};
