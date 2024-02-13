import axios from "axios";
import styled from "styled-components";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Textbox from "../../UI/atoms/Text/Textbox";
import MusicBox from "../../UI/modules/MusicBox/MusicBox";

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const MusicSearchPage = () => {
  const { searchValue } = useParams();

  const [artists, setArtists] = useState([]);
  const [musicList, setMusicList] = useState([]);

  const [isLoadingArtists, setIsLoadingArtists] = useState(true);
  const [isLoadingMusicList, setIsLoadingMusicList] = useState(true);

  useEffect(() => {
    // 아티스트 검색
    axios
      .get(`/study/artist`, {
        params: {
          keyword: `${searchValue}`,
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
        setIsLoadingArtists(false);
      })
      .catch((error) => {
        console.error("아티스트 출력 에러 : ", error);
        setIsLoadingArtists(false);
      });

    // 노래 검색
    axios
      .get(`/study/music`, {
        params: {
          keyword: `${searchValue}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);

        const musicList = response.data.map((item) => ({
          musicId: item.musicId,
          videoId: item.videoId,
          title: item.title,
          artistName: item.artistName,
          musicImageUri: item.musicImageUri,
          musicTime: item.musicTime,
        }));

        setMusicList(musicList);
        setIsLoadingMusicList(false);
      })
      .catch((error) => {
        console.error("아티스트 출력 에러 : ", error);
        setIsLoadingMusicList(false);
      });
  }, []);

  return (
    <div className="MusicSearchPage">
      <Textbox context1={`${searchValue}검색결과`} />
      <hr />
      <Textbox context1="가수" />
      {artists.length === 0 ? (
        <div>검색결과가 없습니다.</div>
      ) : (
        <div>
          {/* artistDto와 musicDto가 구분이 안돼서 파싱이 불가. 일단 주소 매핑 위해 임의로 제작 */}
          {artists &&
            artists.map((item, index) => (
              <div key={index}>
                <Link to={`/study/music/artist/${item.artistId}`}>
                  <StyledImg src={item.artistImageUri} />
                  {item.artistName}
                </Link>
              </div>
            ))}
        </div>
      )}

      <hr />
      <Textbox context1="노래" />

      {musicList.length === 0 ? (
        <div>검색결과가 없습니다.</div>
      ) : (
        <div>
          {musicList &&
            musicList.map((item, index) => (
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
      )}
    </div>
  );
};

export default MusicSearchPage;
