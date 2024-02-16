package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.SentenceDto;
import java.util.HashMap;
import java.util.List;

public interface SentenceMapper {
  List<Integer> getMySentencesList(Object userId) throws Exception;
  List<SentenceDto> getSentencesList(Object sentenceDto) throws Exception;
  SentenceDto getSentence(Object sentenceId) throws Exception;
  void addToMySentenceBook(SentenceDto sentenceDto) throws Exception;

    void deleteSentence(SentenceDto sentenceDto) throws Exception;

  Integer getTodaySentenceSize() throws Exception;

  Integer getTodayWordSize(int sentenceId) throws Exception;

  Integer getTodaySentenceId(int sentenceHash) throws Exception;

  Integer getSentenceIdByLyric(Integer lyricId) throws Exception;

    Integer getLyricIdBySentence(Integer sentenceId) throws Exception;
}
