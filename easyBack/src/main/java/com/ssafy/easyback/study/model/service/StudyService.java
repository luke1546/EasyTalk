package com.ssafy.easyback.study.model.service;


import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.WordDto;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;

public interface StudyService {
    List<WordDto> getWordsList(WordDto wordDto) throws Exception;


  void addToMyWordBook(WordDto wordDto) throws Exception;

  WordDto getWord(WordDto wordDto) throws  Exception;

  List<TestDto> getWordTest(Map<String, Object> param) throws Exception;
}
