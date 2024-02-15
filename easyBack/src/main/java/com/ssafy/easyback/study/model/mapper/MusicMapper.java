package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.AccuracyDto;
import com.ssafy.easyback.study.model.dto.ArtistDto;
import com.ssafy.easyback.study.model.dto.LyricsDto;
import com.ssafy.easyback.study.model.dto.MusicDto;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface MusicMapper {

  List<MusicDto> getMusicList(MusicDto musicDto) throws Exception;

  List<LyricsDto> getMusicDetail(int musicId) throws Exception;

  MusicDto getMusicInfo(int musicId) throws Exception;
  void insertMusicTest(HashMap<String, Object> param) throws Exception;

  int getMusicId(int testId) throws Exception;

  void submitMusicTest(Map<String, Object> param) throws Exception;

  void addToMyMusicBook(HashMap<String,Object> param) throws Exception;

  void deleteMyMusic(HashMap<String, Object> param) throws Exception;

  List<ArtistDto> getArtistList(HashMap<String, Object> param) throws Exception;

  String getMusicTitle(int musicId) throws Exception;

  void addMusicHit(int musicId) throws Exception;

  void endMusicTest(HashMap<String, Object> param) throws Exception;

  String getRecognize(int testId) throws Exception;
}
