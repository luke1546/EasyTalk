import { Link } from "react-router-dom/dist";
import Button from "../../UI/atoms/Button/Button";
import Textbox from "../../UI/atoms/Text/Textbox";
import Profile from "../../UI/modules/Profile";

const HomePage = () => {
  return (
    <>
      <div>
        <Textbox section="singleText" context1="서민지님 안녕하세요 !" />
      </div>
      <div>
        <Profile direction="rigth" text1="기분 좋은 오후에요." text2="식사는 하셨나요 ?" />
      </div>
      <hr />
      <div>
        <Textbox section="singleText" context1="오늘의 쉽게말하는 영어" />
      </div>
      <span>단어박스1 | </span>
      <span>단어박스2 | </span>
      <span>단어박스2</span>
      <div>문장박스1</div>
      <hr />
      <Textbox section="singleText" context1="경험치" />
      <div>경험치 바 들어가야할 곳</div>
      <Textbox section="singleText" context1="서민지님 대단해요 !" />
      <Profile direction="left" text1="95 경험치 더 받으면" text2="2레벨이 돼요." />
      <Link to="/study">
        <Button name="submitBtn" text="학습 이어서하고 경험치 받기" />
      </Link>

      <hr />
      <Textbox section="singleText" context1="출석체크" />
      <div>출석체크하고 경험치 받아가세요 !</div>
      <div>일주일 연속 출석체크 시 30 경험치 포인트 !</div>
      <div>출석 리스트 들어가야할 곳</div>
    </>
  );
};

export default HomePage;
