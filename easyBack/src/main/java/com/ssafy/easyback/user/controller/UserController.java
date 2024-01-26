package com.ssafy.easyback.user.controller;

import com.ssafy.easyback.social.model.service.KakaoService;
import com.ssafy.easyback.user.model.dto.UserAttendance;
import com.ssafy.easyback.user.model.dto.UserDto;
import com.ssafy.easyback.user.model.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

  final UserService userService;
  final KakaoService kakaoService;

  @GetMapping("/registration-check")
  public ResponseEntity<HttpStatus> checkRegisteredUser(HttpSession session) {
    long userId = (Long) session.getAttribute("userId");

    HttpStatus httpStatus = userService.checkRegisteredUser(userId);

    return ResponseEntity.status(httpStatus).build();
  }

  @PostMapping("/register")
  public ResponseEntity<HttpStatus> registerUserInfo(@ModelAttribute("userDto") UserDto userDto,
      HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");
    userDto.setUserId(userId);

    userService.registerUserInfo(userDto);
    return ResponseEntity.status(HttpStatus.OK).build();
  }

  @GetMapping("/attendance/{userId}")
  public ResponseEntity<Object> getAttendanceInfo(@PathVariable("userId") Long userId) {
    UserAttendance userAttendance = userService.getAttendance(userId);

    return ResponseEntity.status(HttpStatus.OK).body(userAttendance);
  }


}

