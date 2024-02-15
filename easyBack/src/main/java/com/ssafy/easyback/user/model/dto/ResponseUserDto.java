package com.ssafy.easyback.user.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ResponseUserDto {
  Long userId;
  String nickname;
  String profileImageUri;
  int exp;
  String info;
}
