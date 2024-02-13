package com.ssafy.datamanager.study.model.mapper;

import java.util.HashMap;
import java.util.List;

public interface SentenceMapper {
  void insertSentence(HashMap<String, Object> param) throws Exception;
  void updateUri() throws Exception;

  void insertSentenceWord(HashMap<String, Object> param) throws Exception;

  Integer getSentenceId(String sentence) throws Exception;

  List<String> getTodaySentenceList() throws Exception;
}
