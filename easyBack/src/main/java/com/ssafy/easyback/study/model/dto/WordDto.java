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
public class WordDto {
    private Long userId;
    private int wordId;
    private String word;
    private String pronunciation;
    private int level;
    int type;
    String wordAudioUri;
    WordMeaningDto[] wordMeaningDto;
    private OptionDto optionDto;
}
