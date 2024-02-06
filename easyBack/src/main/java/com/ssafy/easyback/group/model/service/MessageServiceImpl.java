package com.ssafy.easyback.group.model.service;

import com.ssafy.easyback.group.model.dto.MessageDto;
import com.ssafy.easyback.group.model.mapper.GroupMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

  final GroupMapper groupMapper;

  @Override
  public void saveMessage(MessageDto messageDto) {
    groupMapper.insertMessage(messageDto);
  }
}
