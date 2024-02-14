import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MusicBoxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;

const MusicDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0px 0px 20px;
`;

const MusicTitle = styled.p`
  text-align: left;
  margin: 0;
  padding: 0;
`;

const MusicInfo = styled.div`
  display: flex;
  text-align: left;
  margin: 0;
  padding: 0;
`;

const MusicImage = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
`;

const StyledP = styled.p`
  margin: 20px 20px 0 0;
`;

const MusicBox = ({ musicId, title, artistName, musicTime, musicImageUrl, videoId }) => {
  var sec = musicTime % 60;
  var min = Math.floor(musicTime / 60);
  const time = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  const REDIRECT_URI =
    process.env.REACT_APP_EASYTALK_URL +
    process.env.REACT_APP_FRONT_PORT

  return (
    <div>
      {videoId ? (
        <Link to={`${REDIRECT_URI}/study/music/${musicId}/${videoId}`} state={musicId}>
          <MusicBoxWrapper>
          <MusicImage>
            <img src={musicImageUrl} alt="Album Cover" style={{ width: "200px" }} />
          </MusicImage>
            <MusicDetailsWrapper>
              <MusicTitle className="music-title">{title}</MusicTitle>
              <MusicInfo>
                <StyledP className="music-artist">{artistName}</StyledP>
                <StyledP className="music-artist">|</StyledP>
                <StyledP className="music-time"> {time}</StyledP>
              </MusicInfo>
            </MusicDetailsWrapper>
          </MusicBoxWrapper>
        </Link>
    ) : (
      <Link to={`${REDIRECT_URI}/study/music/${musicId}`} state={musicId}>
        <MusicBoxWrapper>
        <div style={{ display: "flex", justifyContent: "center",  alignItems: "center"}}>
          <img src={musicImageUrl} alt="Album Cover" style={{ width: "200px" }} />
        </div>
          <MusicDetailsWrapper>
            <MusicTitle className="music-title">{title}</MusicTitle>
            <MusicInfo>
              <p className="music-artist">{artistName}</p>
              <p className="music-time"> {time}</p>
            </MusicInfo>
          </MusicDetailsWrapper>
        </MusicBoxWrapper>
      </Link>
    )}
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
