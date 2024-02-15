package com.ssafy.easyback.chatting.model.service;

import com.ssafy.easyback.chatting.model.dto.ResponseMessageDto;
import com.ssafy.easyback.chatting.model.mapper.ChattingMapper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.util.ParameterMap;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChattingServiceImpl implements ChattingService {

  final ChattingMapper chattingMapper;

  @Override
  public List<ResponseMessageDto> joinChatRoom(Long userId, Long targetId) {
    Map<String, Object> params = new ParameterMap<>();
    params.put("userId", userId);
    params.put("targetId", targetId);

    Integer roomId = chattingMapper.selectRoomId(params);
    log.info("userId={}, targetId={} findRoomId={}", userId, targetId, roomId);

    // 그룹 새로만들고
    // 두 유저간 관계형성
    if (roomId == null) {
      params.put("chatType", "PERSONAL");
      List<Long> userIdList = Arrays.asList(userId, targetId);
      params.put("userIdList", userIdList);

      chattingMapper.insertChatRoom(params);
      for (Map.Entry<String, Object> entry: params.entrySet()) {
        log.info("key:value ={}:{}", entry.getKey(), entry.getValue());
      }
      chattingMapper.insertChatRoomRelation(params);

      return new ArrayList<>();
    }

    List<ResponseMessageDto> responseMessageDtos = chattingMapper.selectPreviousMessages(roomId);
    log.info("message={}", responseMessageDtos);
    return responseMessageDtos;
  }
}
