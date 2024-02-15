package com.ssafy.easyback.user.controller;

import com.google.api.Http;
import com.ssafy.easyback.social.model.service.KakaoService;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import com.ssafy.easyback.user.model.dto.UserAttendance;
import com.ssafy.easyback.user.model.dto.RegistrationUserDTO;
import com.ssafy.easyback.user.model.service.UserService;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

  final UserService userService;
  final KakaoService kakaoService;

  @PostMapping("/register")
  public ResponseEntity<HttpStatus> registerUserInfo(@ModelAttribute RegistrationUserDTO userDto,
      HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");
    userDto.setUserId(userId);

    log.info("image file size={}", userDto.getProfileImage().getSize());

    userService.registerUserAndSetAttendance(userDto, userId);
    return ResponseEntity.status(HttpStatus.OK).build();
  }

  @GetMapping("/attendance")
  public ResponseEntity<Object> getAttendanceInfo(HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");

    List<Integer> userAttendance = userService.getAttendance(userId);

    return ResponseEntity.status(HttpStatus.OK).body(userAttendance);
  }

  @GetMapping
  public ResponseEntity<Object> getUserInfo(@RequestParam(value = "targetId", required = false) Long targetId, HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");
    if (targetId != null) {
      userId = targetId;
    }
    ResponseUserDto userInfo = userService.getUserInfo(userId);

    return ResponseEntity.status(HttpStatus.OK).body(userInfo);
  }

  @PutMapping
  public ResponseEntity<?> modifyUserInfo(@ModelAttribute RegistrationUserDTO userDto, HttpSession session) throws Exception{
    System.out.println(userDto);
    Long userId = (Long) session.getAttribute("userId");
    userDto.setUserId(userId);
    userService.modifyUserInfo(userDto);
    return ResponseEntity.ok(HttpStatus.OK);
  }


}

