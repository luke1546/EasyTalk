package com.ssafy.easyback.user.model.dto;

public enum UserRegistrationStatus  {
  // 등록된 사용자
  REGISTERED,
  
  // 다른 아이디가 있는 사용자
  DUPLICATED,
  
  // 등록되지않은 사용자
  UNREGISTERED
}
