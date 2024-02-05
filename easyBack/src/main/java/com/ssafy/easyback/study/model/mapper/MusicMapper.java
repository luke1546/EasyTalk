package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.LyricsDto;
import com.ssafy.easyback.study.model.dto.MusicDto;
import java.util.HashMap;
import java.util.List;

public interface MusicMapper {
  List<MusicDto> getMusicList(MusicDto musicDto) throws Exception;

  List<LyricsDto> getMusicDetail(int musicId) throws Exception;


  HashMap<String, Object> getMusicInfo(int musicId) throws Exception;
  void insertMusicTest(HashMap<String, Object> param) throws Exception;
}
