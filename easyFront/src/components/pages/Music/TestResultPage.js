import { useLocation, useParams, Link } from "react-router-dom";
import BtnBox from "../../UI/modules/BtnBox";

const TestResultPage = () => {
  const location = useLocation();
  const matchRate = location.state?.matchRate;
  //text1, text2, text3, btnText, btnColor
  return (
    <div className="TestResultPage">
      <div>제목 들어갈 위치</div>
      {matchRate >= 60 ? (
        <div>
          성공
          <BtnBox
            text1={`${matchRate}% 달성`}
            text2="학습완료!"
            text3="내가 학습한 기록은 마이 -> 학습 기록에서 확인하실 수 있어요."
            btnText="바로 가기"
            btnLink="/my"
          />
        </div>
      ) : (
        <div>
          {matchRate === undefined ? (
            <div>잘못된 접근입니다</div>
          ) : (
            <BtnBox
              text1={`${matchRate}% 달성`}
              text2="아쉬워요"
              text3="다시 한 번 해볼까요?"
              btnText="다시하기"
              btnLink="/study"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TestResultPage;
