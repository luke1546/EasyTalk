import { useParams, Link } from "react-router-dom";

const SentenceDetailPage = () => {
  return (
    <div className="SentenceDetailPage">
      <div>제목 들어갈 위치</div>
      <div>단어박스들어갈위치</div>
      <div>녹음로직 들어갈 위치</div>
      <div>발음을 인식한 문장</div>
      <div>발음 일치율</div>
    </div>
  );
};

export default SentenceDetailPage;
