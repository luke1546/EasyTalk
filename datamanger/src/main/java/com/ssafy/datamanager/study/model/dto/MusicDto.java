package com.ssafy.datamanager.study.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MusicDto {
    private int musicId;
    private int artistId;
    private String videoId;
    private String title;
    private int musicTime;
    private int hit;
    private String musicImageUri;
}
