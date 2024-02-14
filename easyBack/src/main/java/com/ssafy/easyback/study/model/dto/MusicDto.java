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
public class MusicDto {
    private Long userId;
    private int musicId;
    private int artistId;
    private String artistName;
    private String videoId;
    private String title;
    private int musicTime;
    private int hit;
    private String keyword;
    private String musicImageUri;
    private String artistImageUri;
    private OptionDto optionDto;
}
