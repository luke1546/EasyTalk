import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Textbox from "../../UI/atoms/Text/Textbox";
import axios from "axios";

const WordTestPage = () => {
  const [testWord, setTestWord] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentId, setCurrentId] = useState(null);
  const [isRight, setRight] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentWord, setCurrentWord] = useState(null); // 초기값으로 null 설정
  const [choices, setChoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        const response = await axios.get(`https://i10b307.p.ssafy.io:8080//study/word/test?filter=music&target=${index}`);
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
    console.log(selectedAnswers)
    setIsModalOpen(true);
  };

  const handleNextQuestion = () => {
    setIsModalOpen(false);
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

  const handleModalContentClick = (event) => {
    // 모달 내부를 클릭한 경우에는 이벤트가 모달 외부로 전파되지 않도록 처리
    event.stopPropagation();
  };

  const handleModalOutsideClick = (event) => {
    if (!event.target.closest('.modal-content')) {
      // 모달 외부를 클릭한 경우에만 모달을 닫지 않도록 처리
      event.stopPropagation();
    }
  };
  
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('click', handleModalOutsideClick);
    } else {
      document.removeEventListener('click', handleModalOutsideClick);
    }
  
    // 컴포넌트가 unmount 될 때 이벤트 리스너를 정리
    return () => {
      document.removeEventListener('click', handleModalOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div>
      {!showResult ? (
        <>
          <h2>Question {currentIndex + 1}</h2>
          <h3>{currentWord?.word}</h3> {/* Optional chaining 사용 */}
          {choices.map((choice, index) => (
            <button key={index} onClick={() => handleAnswerClick(choice)}>
              {choice}
            </button>
          ))}
          {isModalOpen && (
            <div className="modal-content" onClick={handleModalContentClick}>
              <Textbox section={'singleText'} context1={isRight ? '맞았습니다!' : '틀렸습니다!'} />
              <button onClick={isRight ? handleNextQuestion : handleSaveWord}>
                {isRight ? '다음 문제로' : '저장하고 다음 문제로'}
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Test Result</h2>
          <p>Correct Answers: {correctAnswers}/{testWord.length}</p>
          <button onClick={handleFinishTest}>Finish Test</button>
        </>
      )}
    </div>
  );
};

export default WordTestPage;
