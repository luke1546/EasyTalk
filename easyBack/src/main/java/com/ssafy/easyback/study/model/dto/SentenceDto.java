package com.ssafy.easyback.study.model.dto;

import java.util.List;
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
  String sentenceAudioUri;
  private OptionDto optionDto;
  private boolean isSaved;
}
