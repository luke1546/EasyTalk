package com.ssafy.datamanager.study.model.service;

import com.ssafy.datamanager.study.model.dto.MusicDto;
import com.ssafy.datamanager.study.model.dto.SentenceDto;

import java.util.HashMap;
import java.util.List;

public interface PreProcessService {

  void insertWord(String word, int level) throws Exception;
  void insertWordList(String filePath, int level) throws Exception;
  void insertSentence(String filePath) throws Exception;
  void getDictionary(String url, String filePath) throws Exception;

  void insertMusicWord(int musicId) throws Exception;

    List<SentenceDto> getSentenceList() throws Exception;

  void setSentenceType(HashMap<String, Object> param) throws Exception;

  void insertLyrics() throws Exception;
}
