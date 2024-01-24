package com.ssafy.easyback.study.model.mapper;

import java.util.List;

import com.ssafy.easyback.study.model.WordDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudyMapper {
  List<String> getList() throws Exception;

    List<WordDto> getWordList(WordDto wordDto) throws Exception;
}
