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
public class TestDto {
  private int questionId;
  private int wordId;
  private int musicId;
  String word;
  String meaning;
  String wrong1;
  String wrong2;
  String wordAudioUri;
  boolean isSaved;
}
