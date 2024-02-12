import axios from "axios";
import styled from "styled-components";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ArtistDetailPage = () => {
  const { index } = useParams();

  const imageUrl = "https://www.upinews.kr/data/upi/image/2020/10/01/upi202010010001.680.0.jpg";

  const StyledImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
  `;

  const searchValue = 1;

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
    <div className="ArtistDetailPage">
      <div>
        <StyledImg src={imageUrl} />
        가수이름 : 가수설명
      </div>
      <hr />
      <div>"가수" 노래 목록</div>
      <div>가수 노래 리스트들</div>
    </div>
  );
};

export default ArtistDetailPage;
