import { Link } from "react-router-dom";
import InputBar from "../../UI/modules/InputBar";
import MusicBox from "../../UI/modules/MusicBox/MusicBox";
import YouTube from "react-youtube";
import ListenBox from "../../UI/modules/ListenBox/ListenBox";
import WordBox from "../../UI/modules/WordBox/WordBox";
import Button from "../../UI/atoms/Button/Button";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ScrollFadeDiv from "./ScrollFadeDiv";

const Hdiv = styled.div`
  padding: 20px 30px 0 30px ;
  border: 2px solid #9c9cff;
  border-radius: 20px;
  margin: 20px;
`;

const Ldiv = styled.div`
  padding: 20px;
  border: 2px solid #9c9cff;
  border-radius: 20px;
  margin: 0 20px;
`;

const MicDiv = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 40px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MicBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 40px;
  color: #8382ff;
  border: 1px solid #8382ff;
  border-radius: 50px;
  background-color: white;
  font-size: 20px;
  padding: 10px 40px; // 패딩을 조절하여 버튼의 높이를 텍스트에 맞춤
  box-shadow: 0px 5px 6px -4px #8382ff;
  margin: 20px auto 0; /* 수정된 부분: 상단 마진을 20px로, 좌우 마진을 auto로 설정하여 수평 가운데 정렬 */
  // margin-right: 85px;
  left: 50%;
  transform: translateX(0%); /* 수정된 부분: 가운데 정렬을 위해 transform을 사용하여 좌표 이동 */

  &:hover {
    box-shadow: 0px 5px 6px 0px #8382ff;
  }
`;

const IntroPage = ({ isEnd }) => {
  const navigate = useNavigate();

  // 클릭 이벤트
  const [clickIndex, setClickIndex] = useState(0);

  const handleClick = () => {
    if (clickIndex < 5) {
      setClickIndex(clickIndex + 1);
    }
  };

  const [musicList, setMusicList] = useState([]);

  const [musicId, setMusicId] = useState("");
  const [videoId, setVideoId] = useState("");

  const [title, setTitle] = useState("");
  const [lyric, setLyric] = useState([]);
  const [sentenceLyric, setSentenceLyric] = useState([]);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const onMusicId = (musicId, videoId) => {
    setMusicId(musicId);
    setVideoId(videoId);
  };

  const color = "black";

  // youtube 창 크기
  const [youtubeWidth, setYoutubeWidth] = useState(0);
  const [youtubeHeight, setYoutubeHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setYoutubeWidth(window.innerWidth * 0.8);
        setYoutubeHeight((window.innerWidth * 0.8 * 9) / 16);
      } else {
        setYoutubeWidth(window.innerWidth * 0.4);
        setYoutubeHeight((window.innerWidth * 0.4 * 9) / 16);
      }
    };

    handleResize(); // 컴포넌트가 처음 렌더링될 때 크기를 설정하기 위해 호출

    window.addEventListener("resize", handleResize); // 창 크기가 변경될 때마다 크기를 다시 설정

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    };
  }, []);

  const [hideFont, setHideFont] = useState(false);

  const onStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      youtubePlay();
      setHideFont(true);
    }
    if (event.data === YouTube.PlayerState.PAUSED) {
      event.target.playVideo();
    }
    if (event.data === YouTube.PlayerState.ENDED) {
      setHideFont(false);
    }
  };

  const [activeLyric, setActiveLyric] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // 글씨가 가지고 있는 색상 상태
  const Letter = ({ letter, active }) => (
    <span style={{ color: active ? "red" : "black" }}>{letter}</span>
  );

  const youtubePlay = () => {
    setIsLoading(true);
    let activeLine = 1;

    lyric.forEach((item, index) => {
      const letters = item.lyric.split("");
      const letterDuration = item.durationMs / letters.length;

      setTimeout(
        () => {
          if (index === 0) {
            setIsLoading(false);
          }
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
        console.log(response);
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
        console.log(response);
        const title = response.data.items[0].snippet.title;
        setTitle(title);
      })
      .catch((error) => {
        console.error("YouTube API 에러 : ", error);
      });

    // musicId에 해당하는 노래의 문장들 정보 axios
    axios
      .get(`/study/music/detail?target=${musicId}`, {
        withCredentials: true,
      })
      .then((response) => {
        const sentenceLyric = response.data.map((item) => ({
          lyric: item.lyric, //
          lyricId: item.lyricId, //
          lyricAudioUri: item.lyricAudioUri, //
          durationMs: item.duration,
          meaning: item.meaning, //
          musicId: item.musicId, //
          startOffsetMs: item.startOffsetMs, //
        }));

        setSentenceLyric(sentenceLyric);
      })
      .catch((error) => {
        console.error("시험 정보 가져옴 에러 : ", error);
      });
  }, [musicId, videoId]);

  // ffffffffffff
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [recognize, setRecognize] = useState("");
  const [score, setScore] = useState();
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0); // 현재 가사 인덱스

  // 녹음 시작
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        setRecordedChunks([]); // 녹음 데이터 초기화
        const newMediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(newMediaRecorder);
        newMediaRecorder.start();
        setIsRecording(true);

        newMediaRecorder.ondataavailable = function (e) {
          setRecordedChunks((prev) => [...prev, e.data]);
        };
      })
      .catch(function (err) {
        console.error("녹음을 시작할 수 없습니다.", err);
      });
  };

  // 녹음 중지
  const stopRecording = () => {
    return new Promise((resolve, reject) => {
      if (mediaRecorder) {
        mediaRecorder.addEventListener(
          "stop",
          () => {
            setIsRecording(false);
            resolve();
          },
          { once: true }
        );
        mediaRecorder.stop();
        setIsRecordLoading(false);
      } else {
        reject("MediaRecorder not available");
      }
    });
  };
  //   if (mediaRecorder) {
  //     mediaRecorder.stop();
  //     setIsRecording(false);
  //   }
  // };

  // 녹음한 오디오 재생
  const playAudio = () => {
    const audioBlob = new Blob(recordedChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const [isRecordLoading, setIsRecordLoading] = useState(false);

  // 녹음한 오디오 서버로 전송
  const uploadAudio = async () => {
    // await stopRecording();

    console.log(mediaRecorder);
    console.log(recordedChunks);

    const audioBlob = new Blob(recordedChunks);
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("sentence", lyric[0].lyric + lyric[1].lyric + lyric[2].lyric + lyric[3].lyric);
    console.log(audioBlob);
    console.log(formData.get("audio"));
    console.log(formData.get("sentence"));

    try {
      console.log(lyric[currentLyricIndex]?.lyric);
      const response = await axios.post("/study/speech", formData, {
        withCredentials: true,
      });
      console.log(response.data);
      console.log(response.data.recognize);
      console.log(response.data.score);

      setRecognize(response.data.recognize);
      setScore(response.data.score);
      setIsRecordLoading(true);
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };

  // ffffffffffff

  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      uploadAudio();
    }
  }, [recordedChunks, isRecording]);

  const [buttonTF, setButtonTF] = useState(false);
  const buttonClick = () => {
    if (buttonTF) {
      if (currentLyricIndex < lyric.length - 1) {
        // 가사가 끝까지 도달하지 않았다면
        setCurrentLyricIndex(currentLyricIndex + 1); // 가사 인덱스 증가
      } else {
        if (matchRate >= 60) {
          navigate("result", { state: { matchRate } });
        } else {
          navigate("result", { state: { matchRate } });
        }
      }
      setButtonTF(false);
      // 여기에 녹음이 종료되며 보내버려서 검증하는게 들어가야함
      console.log("여기에 녹음이 종료되며 보내버려서 검증하는게 들어가야함");
      stopRecording();

      if (currentLyricIndex === 2) {
        setClickIndex(5);
      }
    } else {
      setButtonTF(true);
      // 여기에 녹음하는 기능이 들어가야하고
      console.log("여기에 녹음하는 기능이 들어가야하고");
      startRecording();
      setRecordingCount((prevCount) => prevCount + 1);
    }
  };
  const [totalScore, setTotalScore] = useState(0);
  const [recordingCount, setRecordingCount] = useState(0);
  const matchRate = recordingCount > 0 ? totalScore / recordingCount : 0;

  useEffect(() => {
    if (score) {
      setTotalScore((prevScore) => prevScore + score);
    }
  }, [score]);

  const [isSearched, setIsSearched] = useState(false);

  // 유튜브 비디오 옵저버
  const [videoPlayer, setVideoPlayer] = useState(null);
  const videoRef = useRef(null);

  const onReady = (event) => {
    setVideoPlayer(event.target);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoPlayer) {
          videoPlayer.stopVideo();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [videoPlayer]);
  //

  return (
    <>
      <FlexContainer>
        {/* {clickIndex === 0 && ( */}
        <ScrollFadeDiv>
          {" "}
          <div>
            <br />
            <br />
            <span>
              영어, 아직도 어렵게 생각하세요?
            </span>
            <br />
            <span>
              좋아하는 노래를 따라부르며 <br />영어를 배워보세요!
            </span>
          </div>
          <br />
          <div>
            <span>쉽게말해는
            </span>
            <br />
            <span>중장년층을 위한
            </span>
            <br />
            <span>특별한 영어 학습 플랫폼입니다.</span>
          </div>
          <div>
          <br />
            <span>
              지금 바로
            </span>
            <br />
            <span>쉽게말해의 무료 노래 학습을 체험하고,
            </span>
            <br />
            <span>노래와 함께 영어 실력을 키워보세요!
            </span>
          </div>
          <br />
          <br />
          <br />
          <br />
          <p onClick={handleClick}>
            아래로 스크롤<p>∨</p>
          </p>
          <br />

        </ScrollFadeDiv>
        {/* )}
        {clickIndex === 1 && ( */}
        <ScrollFadeDiv isSearched={isSearched}>
          {" "}
          <div>
            <span>step 1. 원하는 노래를 찾아보세요!</span>
          </div>
          <br />
          <InputBar
            variant="introinputbar"
            onSubmit={async (searchValue) => {
              // 노래 검색
              try {
                setIsSearched(true);

                const response = await axios.get(`/study/music`, {
                  params: {
                    keyword: `${searchValue}`,
                  },
                  withCredentials: true,
                });

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
              } catch (error) {
                console.error("아티스트 출력 에러 : ", error);
              } finally {
                setIsSearched(false);
              }
            }}
          />
          <div>
            {musicList.length === 0 ? (
              <div>검색을 진행해주세요. | 예시: snowman</div>
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
                        linkOff="true"
                      />

                      <div
                        onClick={() => {
                          onMusicId(item.musicId, item.videoId);
                          handleClick();
                        }}
                      >
                        <Button name="submitBtn" text={`${item.title} 선택`} />
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <br />
            <br />
          </div>
          <p onClick={handleClick}>
            아래로 스크롤<p>∨</p>
          </p>
        </ScrollFadeDiv>
        {/* )}
        {clickIndex === 2 && ( */}
        <ScrollFadeDiv>
          <div>
            <span>step 2. <br />원하는 노래를 실시간 번역해 드려요!</span>
          </div>
          <br />
          <div ref={videoRef}>
            <YouTube
              videoId={videoId}
              onReady={onReady}
              onStateChange={onStateChange}
              opts={{
                width: youtubeWidth.toString(),
                height: youtubeHeight.toString(),
              }}
            />
          </div>
          {!hideFont && <div style={{ color: "gray" }}>영상을 클릭하면 자막이 나옵니다.</div>}
          {hideFont && isLoading ? <div>loading...</div> : <></>}
          <div id="lyric" style={{ color: color }}>
            {activeLyric.map((letterComponent, index) => (
              <React.Fragment key={index}>{letterComponent}</React.Fragment>
            ))}
            <br />
            <br />
            <p onClick={handleClick}>
              아래로 스크롤<p>∨</p>
              <p></p>
            </p>
          </div>
          <br />
        </ScrollFadeDiv>
        {/* )}
        {clickIndex === 3 && ( */}
        <ScrollFadeDiv>
          {" "}
          <div>
            <span>step 3. <br />영어 단어와 문장을 학습해보세요!</span>
          </div>
          <br />
          <div>
            {/* <ListenBox/> */}
            {/* 리슨박스 들어가야되는데 ,,, */}
            {/* 일단은 sentence쪽 박스로 */}
            {sentenceLyric &&
              sentenceLyric.slice(0, 3).map((item, index) => (
                <div key={index}>
                  <Ldiv >
                    {/* <Link to={`${item.lyricId}`}> */}
                    <div>{item.lyric}</div>
                    <div>{item.meaning}</div>
                    {/* </Link> */}
                  </Ldiv>
                  <br />
                </div>
              ))}
          </div>
          <br />
          <br />
          <p onClick={handleClick}>
            아래로 스크롤<p>∨</p>
          </p>
          <br />
          <br />
        </ScrollFadeDiv>
        {/* )}{" "} */}
        {/* <p>아래로 스크롤<p></p><p></p></p> */}
        {/* <div>
          <WordBox
          // key={word.wordId}
          // word={word.word}
          // meaning={word.wordMeaningDto[0].meaning}
          // isSaved={word.isSaved}
          // wordAudioUri={word.wordAudioUri}
          />
        </div>

        <p>아래로 스크롤<p></p><p></p></p> */}
        {/* {clickIndex === 4 && ( */}
        <ScrollFadeDiv>
          <div>
            <span>step 4. <br/>따라부르며 나의 실력을 점검해보세요!</span>
          </div>
          <br />
          {sentenceLyric &&
            sentenceLyric.slice(0, 3).map((item, index) => (
              <Hdiv key={index}>
                <div>{item.lyric}</div>
                <div>{item.meaning}</div>
                <br />
              </Hdiv>
            ))}
          <MicDiv>
          {buttonTF ? (
            <>
              {" "}
              <MicBtn name="micCircleBtn" size="40" onClick={buttonClick} />
            </>
          ) : (
            <>
              <MicBtn name="micCircleBtn" size="40" onClick={buttonClick} />

            </>
            )}
          </MicDiv>

          <div>{!isRecording && recordedChunks.length > 0 ? "Loading..." : ""}</div>
          <div>{!isRecordLoading ? "" : "일치율:" + score + '%'}</div>
          <br />
          <br />
          <p onClick={handleClick}>
            아래로 스크롤<p>∨</p>
          </p>
        </ScrollFadeDiv>
        {/* )} */}
        {/* {clickIndex === 5 && ( */}
        <ScrollFadeDiv>
          <div>
            <span>
              <div>{!isRecordLoading ? "Loading..." : "총 정확도 :" + matchRate + "% 일치"}</div>
            </span>
          </div>
          <Link to="/login">
            <Button name="submitBtn" text="지금 가입하기" />
          </Link>
        </ScrollFadeDiv>
        {/* )} */}
      </FlexContainer>
    </>
  );
};

export default IntroPage;
