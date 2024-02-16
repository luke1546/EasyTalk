import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

const MusicBoxWrapper = styled.div`
  display: flex;
  padding: 20px;
  border: 2px solid #9c9cff;
  border-radius: 20px;
  margin: 20px;
  height: 86px;
  // font-weight: bold;
  box-shadow: 0px 5px 6px -4px #9c9cff;

  &:hover {
    box-shadow: 0px 5px 6px 0px #9c9cff;
  }
`;

const MusicDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0px 0 0px 20px;
`;

const MusicTitle = styled.p`
  text-align: left;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const MusicInfo = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  gap: 10px;
`;

const MusicImage = styled.div`
  width: 86px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 5px 6px -4px #121212;
  border-radius: 20px;
`;

const StyledP = styled.p`
  margin: 0;
`;

const MusicBox = ({ musicId, title, artistName, musicTime, musicImageUrl, videoId, linkOff }) => {
  var sec = musicTime % 60;
  var min = Math.floor(musicTime / 60);
  const time = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  const REDIRECT_URI = process.env.REACT_APP_EASYTALK_URL + process.env.REACT_APP_FRONT_PORT;


  const trimmedTitle = (window.innerWidth <= 768 && title.length > 30) 
    ? `${title.substring(0, 30)}...` 
    : (title.length > 100 ? `${title.substring(0, 100)}...` : title);

  const trimmedArtistName = (window.innerWidth <= 500 && artistName.length > 8) 
    ? `${artistName.substring(0, 8)}...` 
    : (artistName.length > 30 ? `${artistName.substring(0, 30)}...` : artistName);

  return (
    <div>
      {videoId ? (
        linkOff ? (
          <Link
            to={`${REDIRECT_URI}/study/music/${musicId}/${videoId}`}
            state={musicId}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <MusicBoxWrapper>
              <MusicImage>
                <img src={musicImageUrl} alt="Album Cover" style={{ width: "86px" }} />
              </MusicImage>
              <MusicDetailsWrapper>
                <MusicTitle className="music-title">{trimmedTitle}</MusicTitle>
                <MusicInfo>
                  <StyledP className="music-artist">{trimmedArtistName}</StyledP>
                  <StyledP className="music-artist">|</StyledP>
                  <StyledP className="music-time"> {time}</StyledP>
                </MusicInfo>
              </MusicDetailsWrapper>
            </MusicBoxWrapper>
          </Link>
        ) : (
          <Link to={`${REDIRECT_URI}/study/music/${musicId}/${videoId}`} state={musicId}>
            <MusicBoxWrapper>
              <MusicImage>
                <img src={musicImageUrl} alt="Album Cover" style={{ width: "86px" }} />
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
        )
      ) : (
        <Link to={`${REDIRECT_URI}/study/music/${musicId}`} state={musicId}>
          <MusicBoxWrapper>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
