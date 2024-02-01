import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SongButton from './SongButton';

export default {
  title: 'UI/ex/SongButton',
  component: SongButton,
};

const Template = (args) => (
  <MemoryRouter>
    <SongButton {...args} />
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
