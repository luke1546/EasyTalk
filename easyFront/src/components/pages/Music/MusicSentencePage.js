import { Link, useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import ListenBox from "../../UI/modules/ListenBox/ListenBox";
import axios from "axios";

const MusicSentencePage = () => {
  const [sentenceIds, setSentenceIds] = useState([]);
  const [title, setTitle] = useState("");

  const match = useMatch("*"); // 현재 경로의 패턴을 가져옴
  let url = match.pathname;
  const tmp = url.split("/");
  const musicId = tmp[3];

  useEffect(() => {
    // 제목 가져오는 axios
    axios
      .get(`/study/music/title?target=${musicId}`)
      .then((response) => {
        setTitle(response.data);
      })
      .catch((error) => {
        console.error("제목 에러 : ", error);
      });

    // musicId에 해당하는 노래의 문장들 정보 axios
    axios
      .get(`/study/music/detail?target=${musicId}`)
      .then((response) => {
        // 문장 IDs를 모두 가져온 후에 한 번에 설정
        const promises = response.data.map((obj) =>
          axios.get(`/study/music/lyric?target=${obj.lyricId}`)
        );
        Promise.all(promises)
          .then((responses) => {
            const lyricIds = responses.map((response) => response.data);
            setSentenceIds(lyricIds);
          })
          .catch((error) => {
            console.error("시험 정보 가져옴 에러 : ", error);
          });
      })
      .catch((error) => {
        console.error("시험 정보 가져옴 에러 : ", error);
      });
  }, [musicId]);

  return (
    <div className="MusicSentencePage">
      <div>{title}</div>
      {sentenceIds.map((id) => (
        <ListenBox key={id} id={id} />
      ))}
    </div>
  );
};

export default MusicSentencePage;

// import { Link, useMatch } from "react-router-dom";
// import { useState, useEffect } from "react";
// import ListenBox from "../../UI/modules/ListenBox/ListenBox";
// import axios from "axios";

// const MusicSentencePage = () => {
//   const [sentenceIds, setSentenceIds] = useState([]);

//   const match = useMatch("*"); // 현재 경로의 패턴을 가져옴
//   let url = match.pathname;
//   const tmp = url.split("/");
//   const musicId = tmp[3];

//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     // 제목 가져오는 axios
//     axios
//       .get(`/study/music/title?target=${musicId}`)
//       .then((response) => {
//         setTitle(response.data);
//       })
//       .catch((error) => {
//         console.error("제목 에러 : ", error);
//       });

//     // musicId에 해당하는 노래의 문장들 정보 axios
//     axios
//       .get(`/study/music/detail?target=${musicId}`)
//       .then((response) => {
//         response.data.map((obj) => {
//           axios
//             .get(`/study/music/lyric?target=${obj.lyricId}`)
//             .then((response) => {
//               // sentenceIds.push(response.data);
//               setSentenceIds(response.data);
//               console.log(sentenceIds);
//             })
//             .catch((error) => {
//               console.error("시험 정보 가져옴 에러 : ", error);
//             });
//         });
//       })
//       .catch((error) => {
//         console.error("시험 정보 가져옴 에러 : ", error);
//       });
//   }, [sentenceIds]);

//   return (
//     <div className="MusicSentencePage">
//       <div>{title}</div>
//       <ListenBox id={202} />
//       {/* {sentenceIds.map((id, index) => (
//         <div key={index}>
//           <ListenBox id={id} />
//         </div>
//       ))} */}
//     </div>
//   );
// };

// export default MusicSentencePage;

// import { Link, useMatch } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const MusicSentencePage = () => {
//   const [lyric, setLyric] = useState([]);

//   const match = useMatch("*"); // 현재 경로의 패턴을 가져옴
//   let url = match.pathname;
//   const tmp = url.split("/");
//   const musicId = tmp[3];

//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     // 제목 가져오는 axios
//     axios
//       .get(`/study/music/title?target=${musicId}`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         setTitle(response.data);
//       })
//       .catch((error) => {
//         console.error("제목 에러 : ", error);
//       });

//     // musicId에 해당하는 노래의 문장들 정보 axios
//     axios
//       .get(`/study/music/detail?target=${musicId}`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         const lyric = response.data.map((item) => ({
//           lyric: item.lyric, //
//           lyricId: item.lyricId, //
//           lyricAudioUri: item.lyricAudioUri, //
//           durationMs: item.duration,
//           meaning: item.meaning, //
//           musicId: item.musicId, //
//           startOffsetMs: item.startOffsetMs, //
//         }));

//         console.log(lyric);

//         setLyric(lyric);
//       })
//       .catch((error) => {
//         console.error("시험 정보 가져옴 에러 : ", error);
//       });
//   }, []);

//   return (
//     <div className="MusicSentencePage">
//       <div>{title}</div>
//       {lyric &&
//         lyric.map((item, index) => (
//           <div key={index}>
//             <div style={{ border: "1px solid black" }}>
//               <Link to={`${item.lyricId}`}>
//                 <div>{item.lyric}</div>
//                 <div>{item.meaning}</div>
//               </Link>
//             </div>
//             <br />
//             <ListenBox
//             key={index}
//             sentence1={{
//               sentence: item.lyric,
//               sentence_id: item.lyricId,
//               meaning: item.meaning,
//               isBookmarked: false, // 북마크 상태는 임시로 false로 설정
//               audioUrl: item.lyricAudioUri,
//             }}
//             sentence2={{
//               sentence: item.lyric, // 두 번째 문장 정보는 적절한 데이터로 변경 필요
//               sentence_id: item.lyricId,
//               meaning: item.meaning,
//               isBookmarked: false,
//               audioUrl: item.lyricAudioUri,
//             }}
//           />
//           </div>
//         ))}
//     </div>
//   );
// };

// export default MusicSentencePage;
