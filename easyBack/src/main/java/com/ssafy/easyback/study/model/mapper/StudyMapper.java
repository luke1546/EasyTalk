package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import java.util.List;

import com.ssafy.easyback.study.model.dto.WordDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudyMapper {
  List<WordDto> getWordsList(WordDto wordDto) throws Exception;
  void insertWord(WordDto wordDto) throws Exception;

  void insertMeaning(WordMeaningDto wordMeaningDto) throws Exception;

  void updateUri(String word) throws Exception;

  int checkWord(String word) throws Exception;

  void addToMyWordBook(WordDto wordDto) throws Exception;

  void getMyWordBookList(WordDto wordDto) throws Exception;
}
