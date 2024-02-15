package com.ssafy.easyback.neighbor.model.dto;


import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FeedDto {
    private Long targetUserId;
    private int feedId;
    private String profileImageUri;
    private String nickname;
    private String content;
    private int heartCount;
    private int commentCount;
    private String registerDate;
    private Boolean myFeed;
    private List<String> feedImageUris;
}

