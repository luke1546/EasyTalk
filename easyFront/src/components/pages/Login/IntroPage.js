import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import InputBar from "../../UI/modules/InputBar";
import MusicBox from "../../UI/modules/MusicBox/MusicBox";
import YouTube from "react-youtube";
import ListenBox from "../../UI/modules/ListenBox/ListenBox";
import WordBox from "../../UI/modules/WordBox/WordBox";
import Button from "../../UI/atoms/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();

  // 클릭 or 클릭 이벤트
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
    formData.append("sentence", lyric[currentLyricIndex - 1]?.lyric);

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

  return (
    <>
      <div className="IntroPage">
        {clickIndex === 0 && (
          <div>
            {" "}
            <div>
              <span>
                영어, 아직도 어렵게 생각하세요? 좋아하는 노래를 따라부르며 영어를 배워보세요!
              </span>
            </div>
            <div>
              <span>쉽게말해는 중장년층을 위한 특별한 영어 학습 플랫폼입니다.</span>
            </div>
            <div>
              <span>
                지금 바로 쉽게말해의 무료 노래 학습을 체험하고, 노래와 함께 영어 실력을 키워보세요!
              </span>
            </div>
            <p onClick={handleClick}>여기를 클릭하면 다음 페이지로 이동해요!</p>
          </div>
        )}
        {clickIndex === 1 && (
          <div>
            {" "}
            <div>
              <span>step 1. 원하는 노래를 찾아보세요!</span>
            </div>
            <InputBar
              variant="introinputbar"
              onSubmit={(searchValue) => {
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
                  })
                  .catch((error) => {
                    console.error("아티스트 출력 에러 : ", error);
                  });
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
                        />
                        <button
                          onClick={() => {
                            onMusicId(item.musicId, item.videoId);
                            handleClick();
                          }}
                        >
                          {item.title} 선택
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <p onClick={handleClick}>여기를 클릭하면 다음 페이지로 이동해요!</p>
          </div>
        )}
        {clickIndex === 2 && (
          <div>
            {" "}
            <div>
              <span>step 2. 원하는 노래를 실시간 번역해 드려요!</span>
            </div>
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
            {isLoading ? <div>loading...</div> : <></>}
            <div id="lyric" style={{ color: color }}>
              {activeLyric.map((letterComponent, index) => (
                <React.Fragment key={index}>{letterComponent}</React.Fragment>
              ))}
              <p onClick={handleClick}>여기를 클릭하면 다음 페이지로 이동해요!</p>
            </div>
          </div>
        )}
        {clickIndex === 3 && (
          <div>
            {" "}
            <div>
              <span>step 3. 영어 단어와 문장을 학습해보세요!</span>
            </div>
            <div>
              {/* <ListenBox/> */}
              {/* 리슨박스 들어가야되는데 ,,, */}
              {/* 일단은 sentence쪽 박스로 */}
              {sentenceLyric &&
                sentenceLyric.slice(0, 3).map((item, index) => (
                  <div key={index}>
                    <div style={{ border: "1px solid black" }}>
                      {/* <Link to={`${item.lyricId}`}> */}
                      <div>{item.lyric}</div>
                      <div>{item.meaning}</div>
                      {/* </Link> */}
                    </div>
                    <br />
                  </div>
                ))}
            </div>
            <p onClick={handleClick}>여기를 클릭하면 다음 페이지로 이동해요!</p>
          </div>
        )}{" "}
        {/* <p>여기를 클릭하면 다음 페이지로 이동해요!</p> */}
        {/* <div>
          <WordBox
          // key={word.wordId}
          // word={word.word}
          // meaning={word.wordMeaningDto[0].meaning}
          // isSaved={word.isSaved}
          // wordAudioUri={word.wordAudioUri}
          />
        </div>

        <p>여기를 클릭하면 다음 페이지로 이동해요!</p> */}
        {clickIndex === 4 && (
          <div>
            <div>
              <span>step 4. 따라부르며 나의 실력을 점검해보세요!</span>
            </div>
            <div>
              <Button name="submitBtn" text="도전하기" />
            </div>
            {sentenceLyric &&
              sentenceLyric.slice(0, 3).map((item, index) => (
                <div key={index}>
                  <div>{item.lyric}</div>
                  <div>{item.meaning}</div>
                  <br />
                </div>
              ))}
            {buttonTF ? (
              <button onClick={buttonClick}>녹음종료</button>
            ) : (
              <button onClick={buttonClick}>녹음하기</button>
            )}

            <div>{!isRecordLoading ? "Loading..." : "녹음된 문장:" + recognize}</div>
            <div>{!isRecordLoading ? "" : "일치율:" + score}</div>
            <p onClick={handleClick}>여기를 클릭하면 다음 페이지로 이동해요!</p>
          </div>
        )}
        {clickIndex === 5 && (
          <div>
            <div>
              <span>
                <div>{!isRecordLoading ? "Loading..." : "총 정확도 :" + matchRate + "% 일치"}</div>
              </span>
            </div>
            <Link to="/login">
              <Button name="submitBtn" text="지금 가입하기" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default IntroPage;
