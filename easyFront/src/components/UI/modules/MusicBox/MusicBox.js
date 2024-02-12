import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MusicDetailPage from "../../../pages/Music/MusicDetailPage";
import "./MusicBox.css";

const MusicBox = ({ musicId, title, artistName, musicTime, musicImageUrl, videoId }) => {
  var sec = musicTime % 60;
  var min = Math.floor(musicTime / 60);
  const time = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  return (
    <Link to={`http://localhost:3000/study/music/${musicId}/${videoId}`} state={musicId}>
      <div className="music-box">
        <img src={musicImageUrl} alt="Album Cover" />
        <div className="music-details">
          <p className="music-title">{title}</p>
          <p className="music-artist">{artistName}</p>
          <p className="music-time">{time}</p>
        </div>
      </div>
    </Link>
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
