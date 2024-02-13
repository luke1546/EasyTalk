package com.ssafy.datamanager.study.model.service;

import com.ssafy.datamanager.study.model.dto.ArtistDto;
import com.ssafy.datamanager.study.model.dto.LyricsDto;
import com.ssafy.datamanager.study.model.dto.MusicDto;
import java.util.HashMap;
import java.util.List;

public interface MusicService {
  void insertMusic(String artistName, String videoId) throws  Exception;
  void insertArtist(ArtistDto artistDto) throws Exception;
  List<MusicDto> getMusicList() throws Exception;
  List<LyricsDto> getMusicDetail(int musicId) throws Exception;

  void deleteLyric(int lyricId) throws Exception;

  void updateLyric(HashMap<String, Object> param) throws Exception;

}
