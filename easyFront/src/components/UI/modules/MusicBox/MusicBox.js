import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./MusicBox.css";

const MusicBox = ({ musicId, title, artistName, musicTime, musicImageUrl, videoId }) => {
  var sec = musicTime % 60;
  var min = Math.floor(musicTime / 60);
  const time = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  const REDIRECT_URI =
  process.env.REACT_APP_EASYTALK_URL +
  process.env.REACT_APP_FRONT_PORT

  return (
    <div>
    { videoId ? (
        <Link to={`${REDIRECT_URI}/study/music/${musicId}/${videoId}`} state={musicId}>
          <div className="music-box">
            <img src={musicImageUrl} alt="Album Cover" />
            <div className="music-details">
              <p className="music-title">{title}</p>
              <p className="music-artist">{artistName}</p>
              <p className="music-time">{time}</p>
            </div>
          </div>
        </Link>
    ) : (
    <Link to={`${REDIRECT_URI}/study/music/${musicId}`} state = { musicId } >
      <div className="music-box">
        <img src={musicImageUrl} alt="Album Cover" />
        <div className="music-details">
          <p className="music-title">{title}</p>
          <p className="music-artist">{artistName}</p>
          <p className="music-time">{time}</p>
        </div>
      </div>
    </Link>
    )};
    </div>
  );
};

MusicBox.propTypes = {
  musicId: PropTypes.number.isRequired,
  musicImageUrlimage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  musicTime: PropTypes.number.isRequired,
};

export default MusicBox;
