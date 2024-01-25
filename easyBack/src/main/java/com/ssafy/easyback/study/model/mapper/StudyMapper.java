package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import java.util.List;

import com.ssafy.easyback.study.model.dto.WordDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudyMapper {
  List<String> getList() throws Exception;
  List<WordDto> getWordList(WordDto wordDto) throws Exception;
  void insertWord(WordDto wordDto) throws Exception;

  void insertMeaning(WordMeaningDto wordMeaningDto) throws Exception;

  void updateUri(String word) throws Exception;
}
