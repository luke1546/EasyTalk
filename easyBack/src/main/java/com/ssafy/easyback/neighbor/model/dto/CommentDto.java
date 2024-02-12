package com.ssafy.easyback.neighbor.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentDto {
    private String nickname;
    private String profileImageUri;
    private String content;
    private String registrationDate;
}
