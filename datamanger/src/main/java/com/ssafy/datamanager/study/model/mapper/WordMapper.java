package com.ssafy.datamanager.study.model.mapper;

import com.ssafy.datamanager.study.model.dto.WordDto;
import com.ssafy.datamanager.study.model.dto.WordMeaningDto;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

public interface WordMapper {
  void insertWord(WordDto wordDto) throws Exception;
  void insertMeaning(WordMeaningDto wordMeaningDto) throws Exception;
  void updateUri() throws Exception;
  int checkWord(String word) throws Exception;
  int getWordId(String word) throws Exception;
  void insertWordMusic(HashMap<String, Object> wordSong) throws Exception;
}
