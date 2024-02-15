package com.ssafy.datamanager.study.model.mapper;

import com.ssafy.datamanager.study.model.dto.LyricsDto;
import com.ssafy.datamanager.study.model.dto.SentenceDto;

import java.util.HashMap;
import java.util.List;

public interface SentenceMapper {
  void insertSentence(HashMap<String, Object> param) throws Exception;
  void updateUri() throws Exception;

    List<SentenceDto> getSentenceList() throws Exception;

  void setSentenceType(HashMap<String, Object> param) throws Exception;

  void insertLyrics(LyricsDto lyricsDto) throws Exception;

  List<LyricsDto> getAllLyrics() throws Exception;

  void insertLyricSentence(LyricsDto lyric) throws Exception;
}
