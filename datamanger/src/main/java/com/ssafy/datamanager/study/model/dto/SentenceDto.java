package com.ssafy.datamanager.study.model.dto;

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
public class SentenceDto {
  private Long userId;
  private int sentenceId;
  private String sentence;
  private String meaning;
  private String sentenceType;
  private String sentenceAudioUri;
  private boolean isSaved;
}
