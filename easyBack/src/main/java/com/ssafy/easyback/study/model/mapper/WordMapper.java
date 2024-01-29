package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import java.util.List;

import com.ssafy.easyback.study.model.dto.WordDto;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WordMapper {
  List<WordDto> getWordsList(WordDto wordDto) throws Exception;
  void insertWord(WordDto wordDto) throws Exception;

  void insertMeaning(WordMeaningDto wordMeaningDto) throws Exception;

  void updateUri(String word) throws Exception;

  int checkWord(String word) throws Exception;

  void addToMyWordBook(WordDto wordDto) throws Exception;

  void getMyWordBookList(WordDto wordDto) throws Exception;

  WordDto getWord(WordDto wordDto) throws Exception;

  List<Integer> getMyWordsList(Long userId) throws Exception;

  List<WordMeaningDto> getMeaning(int wordId) throws Exception;

  void insertTests(Map<String, Object> param) throws Exception;

  int getTestId(Long userId) throws Exception;

  void insertWordTests(Map<String, Object> param) throws Exception;

  List<String> createWrong(int wordId) throws Exception;

  List<Integer> createAnswer(Object level) throws Exception;

  List<TestDto> getWordTest(int testId) throws Exception;
}
