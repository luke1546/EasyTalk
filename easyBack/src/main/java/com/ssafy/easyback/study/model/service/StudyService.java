package com.ssafy.easyback.study.model.service;


import com.ssafy.easyback.study.model.dto.AccuracyDto;
import com.ssafy.easyback.study.model.dto.AnswerDto;
import com.ssafy.easyback.study.model.dto.ArtistDto;
import com.ssafy.easyback.study.model.dto.LyricsDto;
import com.ssafy.easyback.study.model.dto.MusicDto;
import com.ssafy.easyback.study.model.dto.MusicTestDto;
import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.RecordDto;
import com.ssafy.easyback.study.model.dto.SentenceDto;
import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.TodayDto;
import com.ssafy.easyback.study.model.dto.WordDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface StudyService {
    List<WordDto> getWordsList(WordDto wordDto) throws Exception;


  void addToMyWordBook(WordDto wordDto) throws Exception;

  WordDto getWord(WordDto wordDto) throws  Exception;

  List<TestDto> getWordTest(Map<String, Object> param) throws Exception;

  void insertAnswerList(HashMap<String, Object> param) throws Exception;

  List<SentenceDto> getSentencesList(SentenceDto sentenceDto) throws Exception;

  void addToMySentenceBook(SentenceDto sentenceDto) throws Exception;

  SentenceDto getSentence(HashMap<String, Object> param) throws Exception;

  List<MusicDto> getMusicList(MusicDto musicDto) throws Exception;

  List<LyricsDto> getMusicDetail(int musicId) throws Exception;

  MusicTestDto getMusicTest(HashMap<String, Object> param) throws Exception;

  void submitMusicTest(Map<String, Object> param, MultipartFile audioFile) throws Exception;

  void addToMyMusicBook(HashMap<String,Object> param) throws Exception;

  void deleteMyMusic(HashMap<String, Object> param) throws Exception;

  List<RecordDto> getWordRecord(HashMap<String, Object> param) throws Exception;

  List<WordDto> getWordRecordDetail(HashMap<String, Object> param) throws Exception;

  List<ArtistDto> getArtistList(HashMap<String, Object> param) throws Exception;

  void deleteWord(WordDto wordDto) throws Exception;

  void deleteSentence(SentenceDto sentenceDto) throws Exception;

  String getMusicTitle(int musicId) throws Exception;

  TodayDto getTodaySentence() throws Exception;

  void endMusicTest(HashMap<String, Object> param) throws Exception;

  Integer getSentenceIdByLyric(Integer lyricId) throws Exception;

  Integer getLyricIdBySentence(Integer sentenceId) throws Exception;
}
