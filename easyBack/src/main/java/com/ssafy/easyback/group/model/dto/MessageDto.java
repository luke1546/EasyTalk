package com.ssafy.easyback.group.model.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
public class MessageDto {
    int roomId;
    Long userId;
    String content;
    String messageTime;
}
