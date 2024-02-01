package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.SentenceDto;
import java.util.HashMap;
import java.util.List;

public interface SentenceMapper {
  void insertSentence(HashMap<String, Object> param) throws Exception;

  void updateUri() throws Exception;

  List<Integer> getMySentencesList(Object userId) throws Exception;

  List<SentenceDto> getSentencesList(Object sentenceDto) throws Exception;
  SentenceDto getSentence(Object sentenceId) throws Exception;

  void addToMySentenceBook(SentenceDto sentenceDto) throws Exception;
}
