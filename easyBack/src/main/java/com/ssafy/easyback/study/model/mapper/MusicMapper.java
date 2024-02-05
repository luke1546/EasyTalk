package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.AccuracyDto;
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

  void submitMusicTest2(Map<String, Object> param) throws Exception;

  void addToMyMusicBook(HashMap<String,Object> param) throws Exception;
}
