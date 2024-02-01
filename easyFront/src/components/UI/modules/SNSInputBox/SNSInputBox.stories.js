// SNSInputBox.stories.js

import React from 'react';
import { action } from '@storybook/addon-actions';
import SNSInputBox from './SNSInputBox';

export default {
  title: 'UI/ex/SNSInputBox',
  component: SNSInputBox,
};

const Template = (args) => <SNSInputBox {...args} />;

export const PostInput = Template.bind({});
PostInput.args = {
  type: 'post',
  onSubmit: action('Post submitted'),
};

export const CommentInput = Template.bind({});
CommentInput.args = {
  type: 'comment',
  onSubmit: action('Comment submitted'),
};
