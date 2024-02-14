package com.ssafy.easyback.study.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TodayDto {
    private SentenceDto sentence;
    private List<WordDto> words;
}
