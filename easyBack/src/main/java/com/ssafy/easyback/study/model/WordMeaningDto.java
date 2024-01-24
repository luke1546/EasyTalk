package com.ssafy.easyback.study.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WordMeaningDto {
    private int wordId;
    private String meaning;
    private String partOfSpeech;
}
