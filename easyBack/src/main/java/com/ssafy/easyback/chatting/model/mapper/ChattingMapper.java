package com.ssafy.easyback.chatting.model.mapper;


import com.ssafy.easyback.chatting.model.dto.ResponseMessageDto;
import java.util.List;
import java.util.Map;

public interface ChattingMapper {
  Integer selectRoomId(Map<String, Object> params);

  void insertChatRoom(Map<String, Object> params);

  void insertChatRoomRelation(Map<String, Object> params);

  List<ResponseMessageDto> selectPreviousMessages(int roomId);
}
