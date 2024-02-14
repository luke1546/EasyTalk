import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import React from "react";

const MusicDetailPage = () => {
  const { index, videoId } = useParams();

  const [lyric, setLyric] = useState([]);

  // youtube 창 크기
  const [youtubeWidth, setYoutubeWidth] = useState(0);
  const [youtubeHeight, setYoutubeHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setYoutubeWidth(window.innerWidth * 0.8);
        setYoutubeHeight(window.innerWidth * 0.8 * 9 / 16);
      } else {
        setYoutubeWidth(window.innerWidth * 0.4);
        setYoutubeHeight(window.innerWidth * 0.4 * 9 / 16);
      }
    };
  
    handleResize(); // 컴포넌트가 처음 렌더링될 때 크기를 설정하기 위해 호출
  
    window.addEventListener("resize", handleResize); // 창 크기가 변경될 때마다 크기를 다시 설정
  
    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    };
  }, []);
  

  // MusicHomePage같은 페이지들에서 넘어올 때 musicId를 props해서 보내주자
  const musicId = index;

  const color = "black";

  const [saveChecker, setSaveChecker] = useState(false);

  // 유튜브 api 관련 변수
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

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
        width: youtubeWidth.toString(),
        height: youtubeHeight.toString(),
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
        {title && (
          <Link
            to={{
              pathname: "word",
              state: { title: title },
            }}
          >
            단어
          </Link>
        )}
        | <Link to="sentence">문장</Link>
      </div>
      <div>
        {saveChecker ? <span>제거하기</span> : <span onClick={saveMusic}>등록하기</span>}|{" "}
        <Link to="share">공유하기</Link> | <Link to="test">시험보기</Link>
      </div>
    </div>
  );
};

export default MusicDetailPage;
