package com.ssafy.easyback.study.model.mapper;

import com.ssafy.easyback.study.model.dto.AnswerDto;
import com.ssafy.easyback.study.model.dto.RecordDto;
import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;

import java.util.HashMap;
import java.util.List;

import com.ssafy.easyback.study.model.dto.WordDto;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WordMapper {
  List<WordDto> getWordsList(WordDto wordDto) throws Exception;
  void addToMyWordBook(WordDto wordDto) throws Exception;
  WordDto getWord(WordDto wordDto) throws Exception;
  List<Integer> getMyWordsList(Long userId) throws Exception;
  List<WordMeaningDto> getMeaning(int wordId) throws Exception;
  void insertTests(Map<String, Object> param) throws Exception;
  int getTestId(Long userId) throws Exception;
  void insertWordTests(Map<String, Object> param) throws Exception;
  List<Map<String, String>> createWrong(int wordId) throws Exception;
  List<Integer> createAnswer(Object level) throws Exception;
  List<TestDto> getWordTest(int testId) throws Exception;
  void insertAnswer(AnswerDto answer) throws Exception;
  void gradingWordTest(Object testId) throws Exception;
  List<RecordDto> getWordRecord(HashMap<String, Object> param) throws Exception;

  List<WordDto> getWordRecordDetail(HashMap<String, Object> param) throws Exception;

  void deleteWord(WordDto wordDto) throws Exception;

  void getExp(HashMap<String, Object> param) throws Exception;
}