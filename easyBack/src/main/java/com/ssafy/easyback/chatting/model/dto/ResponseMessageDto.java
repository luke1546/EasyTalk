package com.ssafy.easyback.chatting.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseMessageDto {
  int roomId;
  Long userId;
  String content;
  String messageTime;
}
