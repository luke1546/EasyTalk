package com.ssafy.easyback.chatting.model.service;

import com.ssafy.easyback.chatting.model.dto.ResponseMessageDto;
import java.util.List;

public interface ChattingService {

  List<ResponseMessageDto> joinChatRoom(Long userId, Long targetId);
}
