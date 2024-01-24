package com.ssafy.easyback.study.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WordDto {
    private Long userId;
    private int wordId;
    private String word;
    private String pronunciation;
    int level;
    int type;
    String wordAudioUri;
    WordMeaningDto wordMeaningDto;

}
