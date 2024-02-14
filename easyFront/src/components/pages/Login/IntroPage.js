import { Link } from "react-router-dom";
import InputBar from "../../UI/modules/InputBar";
import MusicBox from "../../UI/modules/MusicBox/MusicBox";
import YouTube from "react-youtube";
import ListenBox from "../../UI/modules/ListenBox/ListenBox";
import WordBox from '../../UI/modules/WordBox/WordBox';
import Button from "../../UI/atoms/Button/Button";

const IntroPage = () => {
  return (
    <>
    <div className="IntroPage">
    

    <div>
      <span>
          영어,
          아직도 어렵게 생각하세요?
          좋아하는 노래를 따라부르며
          영어를 배워보세요!
      </span>
    </div>

    <div>
      <span>
          쉽게말해는
          중장년층을 위한 
          특별한 영어 학습 플랫폼입니다.
      </span>
    </div>

  <div>
    <span>
      지금 바로 쉽게말해의
      무료 노래 학습을 체험하고,
      노래와 함께 영어 실력을 
      키워보세요!
    </span>
  </div>
    
  <p>아래로 스크롤</p>
    
  <div>
    <span>
      step 1.
      원하는 노래를 찾아보세요!
    </span>
  </div>
    
  <InputBar variant="introinputbar" />
  
  <div>
    <span>
      Dancing Queen
    </span>
    <MusicBox/>
  </div>
      
  <p>아래로 스크롤</p>
  
  <div>
    <span>
      step 2.
      원하는 노래를 실시간 번역해 드려요!
    </span>
  </div>
  
  <div>
    <YouTube/>
  </div>
      
  <p>아래로 스크롤</p>
      
  <div>
    <span>
      step 3.
      영어 단어와 문장을 학습해보세요!
    </span>
  </div>

  <div>
        {/* <ListenBox/> */}
        리슨박스 들어가야되는데 ,,,
  </div>

  <p>아래로 스크롤</p>

  <div>
    <WordBox
      // key={word.wordId}
      // word={word.word}
      // meaning={word.wordMeaningDto[0].meaning}
      // isSaved={word.isSaved}
      // wordAudioUri={word.wordAudioUri}
    />
  </div>

  <p>아래로 스크롤</p>

  <div>
    <span>
      step 4.
      따라부르며 나의 실력을 점검해보세요!
    </span>
  </div>

  <div>
    <Button name="submitBtn" text="도전하기"/>
  </div>

  <p>아래로 스크롤</p>

  <div>
    <span>
          가사 ~
          일치율
    </span>
  </div>

  <Link to="/login">
    <Button name="submitBtn" text="지금 가입하기"/>
  </Link>

  </div>
  </>
  );
};

export default IntroPage;
