package com.ssafy.easyback.user.model.service;

import com.ssafy.easyback.user.model.dto.UserDto;
import org.springframework.http.HttpStatus;

public interface UserService {

  UserDto getUserInfo(Long userId);

  HttpStatus checkRegisteredUser(long userId);

  void registerUserInfo(UserDto userDto);
}
