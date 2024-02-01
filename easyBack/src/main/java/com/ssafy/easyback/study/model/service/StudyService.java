package com.ssafy.easyback.study.model.service;


import com.ssafy.easyback.study.model.dto.AccuracyDto;
import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.SentenceDto;
import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.WordDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;

public interface StudyService {
    List<WordDto> getWordsList(WordDto wordDto) throws Exception;


  void addToMyWordBook(WordDto wordDto) throws Exception;

  WordDto getWord(WordDto wordDto) throws  Exception;

  List<TestDto> getWordTest(Map<String, Object> param) throws Exception;

  void insertAnswerList(Map<String, Object> param) throws Exception;

  List<SentenceDto> getSentencesList(SentenceDto sentenceDto) throws Exception;

  void addToMySentenceBook(SentenceDto sentenceDto) throws Exception;

  SentenceDto getSentence(HashMap<String, Object> param) throws Exception;
}
