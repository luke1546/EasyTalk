import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import MusicBox from './MusicBox';

export default {
  title: 'UI/ex/MusicBox',
  component: MusicBox,
};

const Template = (args) => (
  <MemoryRouter>
    <MusicBox {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  id: '1',
  image: 'https://example.com/album-cover.jpg',
  title: 'Song Title',
  artist: 'Artist Name',
  album: 'Album Name',
  duration: '3:45',
};
