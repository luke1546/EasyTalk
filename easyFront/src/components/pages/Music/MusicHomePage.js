import { Link } from "react-router-dom";
import Textbox from "../../UI/atoms/Text/Textbox";

const MusicHomePage = () => {
  const arr = ["노래 1", "노래 2", "노래 3"];
  const arr2 = ["노래 1", "노래 2", "노래 3"];
  return (
    <div className="MusicHomePage">
      <div>
        <Link to="/study">노래</Link>
        <Link to="/word">단어</Link>
        <Link to="/sentence">문장</Link>
      </div>
      <div>서치바 위치 들어갈곳</div>
      <Textbox section="singleText" context1="지금 인기있는 노래" />
      <div>
        {arr.map((arrElements, index) => {
          return (
            <Link to={`/study/${index}`}>
              <div key={index}>{arrElements}</div>
            </Link>
          );
        })}
      </div>
      <hr />
      <Textbox section="singleText" context1="AI가 추천하는 노래" />
      <div>
        {arr2.map((arrElements, index) => {
          return (
            <Link to={`/study/${index}`}>
              <div key={index}>{arrElements}</div>
            </Link>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default MusicHomePage;
