package com.ssafy.easyback.study.model.service;


import com.ssafy.easyback.study.model.WordDto;

import java.util.List;

public interface StudyService {
  List<String> getList() throws Exception;

    List<WordDto> getWordList(WordDto wordDto) throws Exception;
}
