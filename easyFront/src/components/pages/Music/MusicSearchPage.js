import axios from "axios";
import styled from "styled-components";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Textbox from "../../UI/atoms/Text/Textbox";
import MusicBox from "../../UI/modules/MusicBox/MusicBox";
import Line from "../../UI/atoms/Line/Line";

const TextDiv = styled.div`
  padding: 20px 40px;
`;

const CenterDib = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const MusicDiv = styled.div`
  margin: 0 20px;
`;

<<<<<<< HEAD
  const StyledImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
  `;
=======
const MusicSearchPage = () => {
  const { searchValue } = useParams();
  const imageUrl = "https://www.upinews.kr/data/upi/image/2020/10/01/upi202010010001.680.0.jpg";
>>>>>>> feature-css

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
<<<<<<< HEAD
=======
        const artists = response.data.map((item) => ({
          artistId: item.artistId,
          artistName: item.artistName,
          hit: item.hit,
          keyword: item.keyword,
          musicId: item.musicId,
          musicImageUri: item.musicImageUri,
          musicTime: item.musicTime,
          optionDto: item.optionDto,
          title: item.title,
          videoId: item.videoId,
        }));

>>>>>>> feature-css
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
      <TextDiv>
        <Textbox context1={`${searchValue} 검색결과`} fontWeight='bold'/>
      </TextDiv>
      <Line />
      <TextDiv>
        <Textbox context1="가수" fontWeight='bold' />
      </TextDiv>
      {artists.length === 0 ? (
        <div>검색결과가 없습니다.</div>
      ) : (
        <div>
          {/* artistDto와 musicDto가 구분이 안돼서 파싱이 불가. 일단 주소 매핑 위해 임의로 제작 */}
<<<<<<< HEAD
          {artists &&
            artists.map((item, index) => (
              <div key={index}>
                <Link to={`/study/music/artist/${item.artistId}`}>
                  <StyledImg src={item.artistImageUri} />
                  {item.artistName}
                </Link>
              </div>
            ))}
=======
          {artists.map((item, index) => (
            <div key={index}>
              <Link to={`/study/music/artist/${item.artistId}`}>
                {/* 지금 나훈아 이미지만 나오지만 호성님이 artistsUrl 추가해주시면 해당 값으로 변경하여 적용 */}
                <StyledImg src={imageUrl} />
                {/* 마찬가지로 이름도 임시로 artistId로 했지만 추후 변경 */}
                <CenterDib>
                  <Textbox context1={`${item.artistName}`} />
                </CenterDib>
              </Link>
            </div>
          ))}
>>>>>>> feature-css
        </div>
      )}

      <Line />
      <TextDiv>
        <Textbox context1="노래" fontWeight='bold' />
      </TextDiv>

      {musicList.length === 0 ? (
        <div>검색결과가 없습니다.</div>
      ) : (
<<<<<<< HEAD
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
=======
        <MusicDiv>
          {artists.map((item, index) => (
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
        </MusicDiv>
>>>>>>> feature-css
      )}
    </div>
  )
}

export default MusicSearchPage;
