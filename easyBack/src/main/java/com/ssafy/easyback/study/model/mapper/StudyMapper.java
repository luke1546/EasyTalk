package com.ssafy.easyback.study.model.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudyMapper {
  List<String> getList() throws Exception;
}
