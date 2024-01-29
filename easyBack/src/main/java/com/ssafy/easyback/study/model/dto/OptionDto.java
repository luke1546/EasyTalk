package com.ssafy.easyback.study.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OptionDto {
  private String order; // 정렬
  private String sort;  // 정렬
  private String filter;
  private int start;  //page 관련
  private int end;    //page 관련
}
