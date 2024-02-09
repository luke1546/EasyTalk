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
public class LyricsDto {
    private int lyricId;
    private int musicId;
    private String lyric;
    private String meaning;
    private int startOffsetMs;
    private int durationMs;
    private String lyricAudioUri;
}
