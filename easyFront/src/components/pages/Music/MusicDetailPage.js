import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import React from "react";

const MusicDetailPage = () => {
  const { index, videoId } = useParams();
  const location = useLocation();

  const [lyric, setLyric] = useState([]);

  // MusicHomePage같은 페이지들에서 넘어올 때 musicId를 props해서 보내주자
  const musicId = index;

  const color = "black";

  const [saveChecker, setSaveChecker] = useState(false);

  // 유튜브 api 관련 변수
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  // const videoId = location.state.videoId;

  // 임시로 스노우맨으로 지정해놨음ㅁ
  // props이나 location으로 이전 페이지에서 할당받는게 맞는 방식일까?
  // 직접 접근하면 videoId가 null이라 페이지 오류 발생하는데,,,
  // const videoId = "gset79KMmt0";

  const [title, setTitle] = useState("");

  const [hideFont, setHideFont] = useState(false);

  const onStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      youtubePlay();
      setHideFont(true);
    }
    if (event.data === YouTube.PlayerState.ENDED) {
      setHideFont(false);
    }
  };

  const [activeLyric, setActiveLyric] = useState([]);

  // 글씨가 가지고 있는 색상 상태
  const Letter = ({ letter, active }) => (
    <span style={{ color: active ? "red" : "black" }}>{letter}</span>
  );

  const youtubePlay = () => {
    let activeLine = 1;

    lyric.forEach((item, index) => {
      const letters = item.lyric.split("");
      const letterDuration = item.durationMs / letters.length;

      setTimeout(
        () => {
          let letterComponents = letters.map((letter, index) => (
            <Letter key={index} letter={letter} active={false} />
          ));

          setActiveLyric((prevLyric) => {
            const newLyric = [...prevLyric];
            newLyric[activeLine] = <div key={index}>{letterComponents}</div>;
            return newLyric;
          });

          letters.forEach((letter, index) => {
            setTimeout(() => {
              letterComponents = [
                ...letterComponents.slice(0, index),
                <Letter key={index} letter={letter} active={true} />,
                ...letterComponents.slice(index + 1),
              ];

              setActiveLyric((prevLyric) => {
                const newLyric = [...prevLyric];
                newLyric[activeLine] = <div key={index}>{letterComponents}</div>;
                return newLyric;
              });
            }, index * letterDuration);
          });

          // lyric[0]일 때 두 번째 줄이 출력되지 않는 것을 방지하기 위한 코드
          if (index < lyric.length - 1) {
            const nextLetters = lyric[index + 1].lyric.split("");
            const nextLetterComponents = nextLetters.map((letter, index) => (
              <Letter key={index} letter={letter} active={false} />
            ));

            setActiveLyric((prevLyric) => {
              const newLyric = [...prevLyric];
              newLyric[1 - activeLine] = <div key={index + 1}>{nextLetterComponents}</div>;
              return newLyric;
            });
          }

          activeLine = 1 - activeLine; // activeLine 전환 (0, 1 상태)
        },
        item.startOffsetMs // 가사의 시작 시점을 지정
      );
    });
  };

  useEffect(() => {
    // 자막 정보 가져오는 axios
    // 영상 진행에 따른 동적 처리로 자막을 실시간으로 바꿔줘야할듯?
    axios
      .get(`/study/music/detail`, {
        params: {
          target: `${musicId}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        const lyric = response.data.map((item) => ({
          startOffsetMs: item.startOffsetMs,
          lyric: item.lyric,
          durationMs: item.durationMs,
        }));

        setLyric(lyric);
      })
      .catch((error) => {
        console.error("실시간 가사 에러 : ", error);
      });

    //유튜브 api 관련 axios
    axios
      .get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`)
      .then((response) => {
        const title = response.data.items[0].snippet.title;
        setTitle(title);
      })
      .catch((error) => {
        console.error("YouTube API 에러 : ", error);
      });
  }, []);

  // 유저가 노래를 저장하기 위한 post 매핑
  const saveMusic = () => {
    axios
      .post(`/study/music`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setSaveChecker(true);
      })
      .catch((error) => {
        console.error("저장 실패 : ", error);
      });
  };

  return (
    <div className="MusicDetailPage">
      {/* 제목의 경우 유튜브 api 가져오면서 해당 제목을 파싱 */}
      <div>{title}</div>
      <div>
        <YouTube
          videoId={videoId}
          onStateChange={onStateChange}
          opts={{
            height: "200",
            width: "300",
          }}
        />
      </div>
      {!hideFont && <div style={{ color: "gray" }}>영상을 클릭하면 자막이 나옵니다.</div>}
      <div id="lyric" style={{ color: color }}>
        {activeLyric.map((letterComponent, index) => (
          <React.Fragment key={index}>{letterComponent}</React.Fragment>
        ))}
      </div>
      {/* <button onClick={youtubePlay}>자막 실행</button> */}
      <hr />
      <div>
        <Link to="word">단어</Link> | <Link to="sentence">문장</Link>
      </div>
      <div>
        {saveChecker ? <span>제거하기</span> : <span onClick={saveMusic}>등록하기</span>}|{" "}
        <Link to="share">공유하기</Link> | <Link to="test">시험보기</Link>
      </div>
    </div>
  );
};

export default MusicDetailPage;
