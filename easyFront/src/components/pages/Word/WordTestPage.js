import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Textbox from "../../UI/atoms/Text/Textbox";
import Modal from 'react-modal';
import axios from "axios";
import styled from "styled-components";
import Line from "../../UI/atoms/Line/Line";

const WordDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

const H2 = styled.p`
  color: #8382ff;  // 원하는 색상으로 변경 가능
  margin: 0;
`;

const Btn = styled.button`
  border: 1px solid #8382ff;
  border-radius: 10px;
  background-color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  padding: 10px 40px; // 패딩을 조절하여 버튼의 높이를 텍스트에 맞춤
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 6px -4px #8382ff;
  margin: 20px 20px 0;

  &:hover {
    box-shadow: 0px 5px 6px 0px #8382ff;
  }
`;

const ModalText = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const NextButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 18px;
  box-shadow: 0px 5px 6px -4px #121212;
`;

const SaveButton = styled.button`
  background-color: #ff0000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 18px;
  box-shadow: 0px 5px 6px -4px #121212;
`;

const CustomModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 999; // 모달 위에 위치하도록 설정
  width: 80%;
  height: 15%;
`;

const ModalContent = styled.div`
  text-align: center;
  position: relative; // 모달 안의 요소들의 위치를 상대적으로 조정하기 위해 추가
`;

const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(0%, 30%);
`;

const CustomModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명한 검은색 배경
  z-index: 998; // 모달 위에 위치하도록 설정
`;

const ResultText = styled.p`
  font-size: 20px;
  margin: 20px;
`;

const WordTestPage = () => {
  const [testWord, setTestWord] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentId, setCurrentId] = useState(null);
  const [isRight, setRight] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentWord, setCurrentWord] = useState(null); // 초기값으로 null 설정
  const [choices, setChoices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { level, index } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const fetchTestWords = async () => {
      try {
        if(level){
        const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/word/test?level=${level}`);
        setTestWord(response.data);
      }
        else{
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/word/test?filter=music&target=${index}`);
          setTestWord(response.data);
        }
      } catch (error) {
        console.error('단어 목록을 가져오는 중 에러 발생:', error);
      }
    };

    fetchTestWords();
  }, [level]);

  useEffect(() => {
    // 현재 단어와 선택지를 설정
    if (testWord.length > 0 && testWord[currentIndex]) {
      setCurrentWord(testWord[currentIndex]);
      setCurrentId(testWord[currentIndex].questionId);
      setChoices(shuffleArray([testWord[currentIndex].meaning, testWord[currentIndex].wrong1, testWord[currentIndex].wrong2]));
    }
  }, [currentIndex, testWord]);
  

  // 배열을 랜덤하게 섞는 함수
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === currentWord.meaning) {
      setRight(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setRight(false);
    }
    selectedAnswers.push({'questionId':currentId, 'input':selectedAnswer});
    setIsOpen(true);
  };

  const handleNextQuestion = () => {
    setIsOpen(false);
    if (currentIndex < testWord.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleSaveWord = async () => {
    // 단어 저장 API 호출
    try {
      await axios.post(`https://i10b307.p.ssafy.io:8080/study/word`, { 'wordId': currentWord.wordId });
    } catch (error) {
      console.error('단어 저장 중 에러 발생:', error);
    }
    handleNextQuestion(); // 다음 문제로 이동
  };

  const handleFinishTest = async () => {
    // 시험 결과 저장 API 호출
    try {
      await axios.put(`https://i10b307.p.ssafy.io:8080/study/word/test`, selectedAnswers);
    } catch (error) {
      console.error('시험 결과 저장 중 에러 발생:', error);
    }
    navigate(`/myrecodeword`); // 학습 목록 페이지로 이동
  };

  return (
    <WordDiv>
      {!showResult ? (
        <>
          <H2>
            문제 {currentIndex + 1}
            <br />
            다음 단어의 올바른 뜻을 고르세요.
          </H2>
          <Line />
          <h3>{currentWord?.word}</h3> {/* Optional chaining 사용 */}
          {choices.map((choice, index) => (
            <Btn key={index} onClick={() => handleAnswerClick(choice)}>
              {choice}
            </Btn>
          ))}
          <br />
          <br />
          {/* 모달을 제외한 페이지에 오버레이 추가 */}
          {isOpen && <CustomModalOverlay />}
          <CustomModal
            isOpen={isOpen}
            overlayClassName="custom-overlay"
            className="custom-modal"
            shouldCloseOnOverlayClick={false}
          >
            <ModalContent>
              <ModalText>{isRight ? '맞았습니다!' : '틀렸습니다!'}</ModalText>
              {isRight ? 
                <NextButton onClick={handleNextQuestion}>다음 문제로</NextButton>
                :
                <SaveButton onClick={handleSaveWord}>저장하고 다음 문제로</SaveButton>
              }
            </ModalContent>
          </CustomModal>
        </>
      ) : (
      <ModalDiv>
        <ModalContent>
              <h2>시험 결과</h2>
              <ResultText>맞힌 문제 수: {correctAnswers}/{testWord.length}</ResultText>
              <Btn onClick={handleFinishTest}>학습기록 바로가기</Btn>
            </ModalContent>
          </ModalDiv>
      )}
    </WordDiv>
  );
};

export default WordTestPage;