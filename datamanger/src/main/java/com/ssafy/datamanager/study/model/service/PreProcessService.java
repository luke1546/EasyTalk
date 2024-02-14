package com.ssafy.datamanager.study.model.service;

import java.util.HashMap;

public interface PreProcessService {

  void insertWord(String word, int level) throws Exception;
  void insertWordList(String filePath, int level) throws Exception;
  void insertSentence(String filePath) throws Exception;
  void getDictionary(String url, String filePath) throws Exception;

  void insertMusicWord(int musicId) throws Exception;

  void insertSentenceWord(HashMap<String, Object> param) throws Exception;
}
