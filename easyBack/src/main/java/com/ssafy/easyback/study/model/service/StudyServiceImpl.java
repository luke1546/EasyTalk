package com.ssafy.easyback.study.model.service;

import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.mapper.StudyMapper;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StudyServiceImpl implements StudyService{
  private StudyMapper studyMapper;

  public StudyServiceImpl(StudyMapper studyMapper) {
    this.studyMapper = studyMapper;
  }
  @Override
  public List<WordDto> getWordsList(WordDto wordDto) throws Exception {
    return studyMapper.getWordsList(wordDto);
  }

  @Override
  public void addToMyWordBook(WordDto wordDto) throws Exception {
    studyMapper.addToMyWordBook(wordDto);
  }
}
