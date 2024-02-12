import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const MusicSharePage = () => {
  const [error, setError] = useState(null);

  const handleShare = () => {
    if (navigator.share) {
      console.log("실행가넝");
      navigator
        .share({
          title: "공유하기 제목",
          text: "공유하기 내용",
          url: window.location.href,
        })
        .catch((error) => setError("공유하기 실패: " + error));
    } else {
      setError("공유 기능을 지원하지 않는 브라우저입니다.");
    }
  };

  return (
    <div className="MusicSharePage">
      {" "}
      <div>
        <button onClick={handleShare}>공유하기</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default MusicSharePage;
