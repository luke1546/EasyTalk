import axios from "axios";
import styled from "styled-components";

import { useParams, Link, useMatch } from "react-router-dom";
import { useState, useEffect } from "react";

import MusicBox from "../../UI/modules/MusicBox/MusicBox";

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ArtistDetailPage = () => {
  const match = useMatch("*"); // 현재 경로의 패턴을 가져옴
  let url = match.pathname;
  const tmp = url.split("/");
  const artistId = tmp[4];

  const [artists, setArtists] = useState([]);
  const [artistMusicList, setArtistMusicList] = useState([]);

  useEffect(() => {
    // 아티스트 검색
    axios
      .get(`/study/artist`, {
        params: {
          type: "detail",
          target: `${artistId}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);

        const artists = response.data.map((item) => ({
          artistId: item.artistId,
          artistImageUri: item.artistImageUri,
          artistName: item.artistName,
          description: item.description,
        }));

        setArtists(artists);
      })
      .catch((error) => {
        console.error("아티스트 출력 에러 : ", error);
      });

    // 노래 검색
    axios
      .get(`/study/music`, {
        params: {
          filter: "artist",
          target: `${artistId}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);

        const artistMusicList = response.data.map((item) => ({
          artistId: item.artistId,
          hit: item.hit,
          keyword: item.keyword,
          musicId: item.musicId,
          musicImageUri: item.musicImageUri,
          musicTime: item.musicTime,
          optionDto: item.optionDto,
          title: item.title,
          userId: item.userId,
          videoId: item.videoId,
        }));

        setArtistMusicList(artistMusicList);
      })
      .catch((error) => {
        console.error("아티스트 출력 에러 : ", error);
      });
  }, []);

  return (
    <div className="ArtistDetailPage">
      <div>
        <StyledImg src={artists[0]?.artistImageUri} />
        {artists[0]?.artistName}
        {artists[0]?.description != null ? (
          <>
            <div>: {artists[0].description}</div>
          </>
        ) : (
          <div>: 정보가 없습니다.</div>
        )}
      </div>
      <hr />
      <div>"{artists[0]?.artistName}" 노래 목록</div>
      {artistMusicList &&
        artistMusicList.map((item, index) => (
          <div key={index}>
            <MusicBox
              musicId={item.musicId}
              title={item.title}
              artistName={item.artistName}
              musicTime={item.musicTime}
              musicImageUrl={item.musicImageUri}
              videoId={item.videoId}
            />
          </div>
        ))}
    </div>
  );
};

export default ArtistDetailPage;
