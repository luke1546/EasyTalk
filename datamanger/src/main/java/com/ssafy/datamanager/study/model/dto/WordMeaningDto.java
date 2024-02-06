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
public class WordMeaningDto {
    private int wordId;
    private String word;
    private String meaning;
    private String partOfSpeech;
}
