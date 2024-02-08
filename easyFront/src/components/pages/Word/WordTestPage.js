// WordTestPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from "../../UI/atoms/Text/Textbox";
import BtnBox from "../../UI/modules/BtnBox";
import { useState, useEffect } from "react";
import axios from "axios";

const WordTestPage = ( ) => {
  const [testWord, setTestWord] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRight, setRight] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const selectedAnswers = [];
  const { level } = useParams();
  const currentWord = testWord[currentIndex];
  const [choices, setChoices] = useState(shuffleArray([currentWord.answer, currentWord.wrong1, currentWord.wrong2]));
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const mw = Math.random();

    const wordTest = async () => {
      try {
        if (mw < 50) {
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/word/test?level=${level}`);
          console.log(response.data);
          setTestWord(response.data);
        }
        else {
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/word/test?level=${level}&testType=${mw}`);
          console.log(response.data);
          setTestWord(response.data);
        }
      } catch (error) {
        console.error('단어 목록을 가져오는 중 에러 발생:', error);
      }
    };

    wordTest();
  }, [level]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === currentWord.answer) {
      setRight(true)
      selectedAnswers.push(selectedAnswer);
      setCorrectAnswers(correctAnswers + 1);
    }
    else {
      setRight(false)
      selectedAnswers.push(selectedAnswer);
    }
    if (currentIndex === testWord.length - 1) {
      setShowResult(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleNextQuestion = () => {

  };

  const handleSaveWord = () => {

  };


  return (
    <div>
      {!showResult ? (
        <>
          <h2>Question {currentIndex + 1}</h2>
          <h3>{currentWord.word}</h3>
          {choices.map((choice, index) => (
            <button key={index} onClick={() => handleAnswerClick(choice)}>
              {choice}
            </button>
          ))}
          <div >
            {isModalOpen && (isRight ? (
              <>
                <Textbox section={'singleText'} context1={'맞았습니다!'} />
                <button onClick={handleNextQuestion}>
                  다음 문제로
                </button>
              </>
            ) : (
              <>
                <Textbox section={'singleText'} context1={'틀렸습니다!'} />
                <button onClick={handleSaveWord}>
                  저장하고 다음문제로
                </button>
              </>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Test Result</h2>
          <p>Correct Answers: {correctAnswers}/{wordsData.length}</p>
          <button onClick={handleFinishTest}>Finish Test</button>
        </>
      )}
    </div>
  ); 
};

export default WordTestPage;
