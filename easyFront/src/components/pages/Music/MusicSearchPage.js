import axios from "axios";
import styled from "styled-components";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Textbox from "../../UI/atoms/Text/Textbox";
import MusicBox from "../../UI/modules/MusicBox/MusicBox";

const MusicSearchPage = () => {
  const { searchValue } = useParams();
  const imageUrl = "https://www.upinews.kr/data/upi/image/2020/10/01/upi202010010001.680.0.jpg";

  const StyledImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
  `;

  const [artists, setArtists] = useState([]);
  useEffect(() => {
    axios
      .get(`/study/music`, {
        params: {
          keyword: `${searchValue}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        const artists = response.data.map((item) => ({
          artistId: item.artistId,
          hit: item.hit,
          keyword: item.keyword,
          musicId: item.musicId,
          musicImageUri: item.musicImageUri,
          musicTime: item.musicTime,
          optionDto: item.optionDto,
          title: item.title,
          videoId: item.videoId,
        }));

        console.log(response.data);

        setArtists(artists);
      })
      .catch((error) => {
        console.error("아티스트 출력 에러 : ", error);
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
          {artists.map((item, index) => (
            <div key={index}>
              <Link to={`/study/music/artist/${item.artistId}`}>
                {/* 지금 나훈아 이미지만 나오지만 호성님이 artistsUrl 추가해주시면 해당 값으로 변경하여 적용 */}
                <StyledImg src={imageUrl} />
                {/* 마찬가지로 이름도 임시로 artistId로 했지만 추후 변경 */}
                {item.artistId}
              </Link>
            </div>
          ))}
        </div>
      )}

      <hr />
      <Textbox context1="노래" />

      {artists.length === 0 ? (
        <div>검색결과가 없습니다.</div>
      ) : (
        <div>
          {artists.map((item, index) => (
            <div key={index}>
              <MusicBox
                musicId={item.musicId}
                title={item.title}
                artistName={item.artistId} // artistName 핑료합니다..
                musicTime={item.musicTime}
                musicImageUrl={item.musicImageUri}
                videoId={item.videoId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MusicSearchPage;
