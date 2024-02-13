package com.ssafy.easyback.neighbor.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentDto {
    private Integer commentId;
    private String nickname;
    private String profileImageUri;
    private String content;
    private Boolean myFeed;
    private String registrationDate;
}
