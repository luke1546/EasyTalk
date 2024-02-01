import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SongButton.css';

const SongButton = ({ id, image, title, artist, album, duration }) => {
  return (
    <Link to={`/songs/${id}`}>
      <div className="song-button">
        <img src={image} alt="Album Cover" />
        <div className="song-details">
          <p className="song-title">{title}</p>
          <p className="song-artist">{artist}</p>
          <p className="song-album">{album}</p>
          <p className="song-duration">{duration}</p>
        </div>
      </div>
    </Link>
  );
};

SongButton.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default SongButton;
