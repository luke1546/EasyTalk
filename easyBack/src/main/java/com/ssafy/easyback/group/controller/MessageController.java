package com.ssafy.easyback.group.controller;

import com.ssafy.easyback.group.model.dto.MessageDto;
import com.ssafy.easyback.group.model.service.MessageService;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MessageController {

  final MessageService messageService;

  // 클라이언트가 "/app/chat.sendMessage" 대상으로 메시지를 보내면 이 메서드가 메시지를 받습니다.
  @MessageMapping("/chat.sendMessage/{roomId}")

  // 이 메서드의 반환값이 "/topic/public/{roomId}" 대상으로 브로드캐스트됩니다.
  @SendTo("/topic/public/{roomId}")

  // 클라이언트로부터 받은 메시지를 그대로 반환합니다.
  public String sendMessage(@Payload String chatMessage, @DestinationVariable("roomId") int roomId,
      SimpMessageHeaderAccessor messageHeaderAccessor) {
    HttpSession session = (HttpSession) messageHeaderAccessor.getSessionAttributes().get("session");
    Long userId = (Long) session.getAttribute("userId");

    log.info("roomId={}", roomId);
    log.info("userId={}", userId);

    //채팅 데이터 저장하기
    MessageDto messageDto = MessageDto.builder()
        .roomId(roomId)
        .userId(userId)
        .content(chatMessage)
        .messageTime(LocalDateTime.now().toString())
        .build();

    messageService.saveMessage(messageDto);

    // 채팅 전송하기
    return "room=-" + roomId + "\n " + userId +"님: " + chatMessage;
  }
}
