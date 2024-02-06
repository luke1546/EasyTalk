package com.ssafy.datamanager.study.model.dto;

import lombok.*;

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
    private int duration;
    private String lyricAudioUri;
}
