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
public class WordDto {
    private Long userId;
    private int wordId;
    private String word;
    private String pronunciation;
    private int level;
    private String type;
    private String meaning;
    String wordAudioUri;
    List<WordMeaningDto> wordMeaningDto;
    private OptionDto optionDto;
    private Boolean isSaved;
    private int musicId;
    private Boolean isRight;
}
