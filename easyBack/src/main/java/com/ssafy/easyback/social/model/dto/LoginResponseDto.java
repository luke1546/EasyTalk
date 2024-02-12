package com.ssafy.easyback.social.model.dto;

import lombok.Data;

@Data
public class LoginResponseDto {

  public Enum UserRegistrationStatus;
  public Long userId;
}