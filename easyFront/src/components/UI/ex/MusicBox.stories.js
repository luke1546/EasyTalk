import React from 'react';
import MusicBox from "./MusicBox";

export default {
  title: 'UI/ex/MusicBox',
  component: MusicBox,
};

const Template = (args) => <MusicBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  image: 'none',
  title: 'Song Title',
  artist: 'Artist Name',
  album: 'album',
  duration: '4:44',
};
