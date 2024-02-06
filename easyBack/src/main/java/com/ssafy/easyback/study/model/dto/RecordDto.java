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
public class RecordDto {
  private int testId;
  private String target;  // 음악단어 or 일반단어
  private String testTitle; // 테스트 제목
  private String startTime; // 시험 시작시간
  private int score;
  private String testAudioUri;
}
