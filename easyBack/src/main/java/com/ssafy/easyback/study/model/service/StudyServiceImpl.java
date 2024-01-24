package com.ssafy.easyback.study.model.service;

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
  public List<String> getList() throws Exception {
    return studyMapper.getList();
  }
}
