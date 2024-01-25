package com.ssafy.easyback.user.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserDto {

  Long userId;
  String nickname;
  String profileImageUri;
  MultipartFile profileImage;
  int exp;
  String info;
  String phone;
}
