import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button";
import './TabBar.css';

const MusicBox = ({ image, title, artist, duration, album }) => {
  return (
    <Button name="basicBtn" className='song-button'>
      <img src={image} alt="Song Image" />
        <p className="song-title">{title}</p>
        <p className="song-artist">{artist}</p>
        <p className="song-album">{album}</p>
        <p className="song-duration">{duration}</p>
    </Button>
  );
};

MusicBox.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default MusicBox;