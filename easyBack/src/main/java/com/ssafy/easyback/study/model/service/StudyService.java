package com.ssafy.easyback.study.model.service;


import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.WordDto;

import java.util.List;

public interface StudyService {
    List<WordDto> getWordsList(WordDto wordDto) throws Exception;


  void addToMyWordBook(WordDto wordDto) throws Exception;

}
