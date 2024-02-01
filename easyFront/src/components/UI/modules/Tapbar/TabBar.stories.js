// TabBar.stories.js

import React from 'react';
import TabBar from './TabBar';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'UI/ex/TabBar',
  component: TabBar,
};

const Template = (args) => (
  <Router>
    <TabBar {...args} />
  </Router>
);

export const GroupPage = Template.bind({});
GroupPage.args = {
  tabs: [
    { label: 'Group Overview', to: '/group/overview' },
    { label: 'Group Members', to: '/group/members' },
    { label: 'Group Posts', to: '/group/posts' },
    { label: 'Group Settings', to: '/group/settings' },
  ],
};

export const LearningPage = Template.bind({});
LearningPage.args = {
  tabs: [
    { label: 'My Courses', to: '/learning/courses' },
    { label: 'Progress', to: '/learning/progress' },
    { label: 'Certificates', to: '/learning/certificates' },
  ],
};
