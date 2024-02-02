// Profile.stories.js

import React from 'react';
import Profile from './Profile';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Profile',
  component: Profile,
  argTypes: {
    pageType: {
      control: {
        type: 'select',
        options: ['vertical', 'horizontal'],
      },
    },
  },
};

const Template = (args) => (
  <MemoryRouter>
    <Profile {...args} />
  </MemoryRouter>
);

export const VerticalLayout = Template.bind({});
VerticalLayout.args = {
  userId: '1',
  profileImg: 'https://placekitten.com/50/50',
  userName: 'John Doe',
  pageType: 'vertical',
};

export const HorizontalLayout = Template.bind({});
HorizontalLayout.args = {
  userId: '1',
  profileImg: 'https://placekitten.com/50/50',
  userName: 'John Doe',
  pageType: 'horizontal',
};
