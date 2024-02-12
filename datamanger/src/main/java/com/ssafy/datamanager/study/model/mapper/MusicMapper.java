package com.ssafy.datamanager.study.model.mapper;

import com.ssafy.datamanager.study.model.dto.ArtistDto;
import com.ssafy.datamanager.study.model.dto.LyricsDto;
import com.ssafy.datamanager.study.model.dto.MusicDto;
import java.util.HashMap;
import java.util.List;

public interface MusicMapper {
  void insertArtist(ArtistDto artistDto) throws Exception;
  int getArtistId(String artistName) throws Exception;
  void insertMusic(MusicDto musicDto) throws Exception;
  void insertLyric(HashMap<String, Object> param) throws Exception;
  void insertLyricAudioUri() throws Exception;
  int getMusicId(String videoId) throws Exception;
  List<MusicDto> getMusicList() throws Exception;
  List<LyricsDto> getMusicDetail(int musicId) throws Exception;
  void deleteLyric(int lyricId) throws Exception;
  void updateLyric(HashMap<String, Object> param) throws Exception;
}
