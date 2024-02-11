package com.ssafy.easyback.chatting.controller;

import com.ssafy.easyback.chatting.model.service.ChattingService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller()
@RequestMapping("/chatting")
@RequiredArgsConstructor
@Slf4j
public class ChattingController {
  final ChattingService chattingService;

  @GetMapping("/{targetId}")
  public ResponseEntity<Object> enterChatRoom(@PathVariable("targetId") Long targetId,
      HttpSession session) {

    Long userId = (Long) session.getAttribute("userId");
    log.info("userId={} targetId={}", userId, targetId);

    return ResponseEntity.status(HttpStatus.OK).body(chattingService.joinChatRoom(userId, targetId));
  }
}
