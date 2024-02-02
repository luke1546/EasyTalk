import { useParams } from "react-router-dom";

const MusicDetailPage = () => {
  const { index } = useParams();

  return (
    <div className="MusicDetailPage">
      <div>상단 바 부분</div>
      <div>{index} 해당 제목</div>
      <div>{index} 해당 유튜브</div>
      <div>해당 실시간 가사</div>
      <hr />
      <div>해당 단어 문장</div>
      <div>제거하기 | 공유하기 | 시험보기</div>
    </div>
  );
};

export default MusicDetailPage;
