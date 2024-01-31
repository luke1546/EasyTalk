package com.ssafy.easyback.user.model.service;

import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import com.ssafy.easyback.user.model.dto.UserAttendance;
import com.ssafy.easyback.user.model.dto.RegistrationUserDTO;
import org.springframework.http.HttpStatus;

public interface UserService {

  ResponseUserDto getUserInfo(Long userId);

  HttpStatus checkRegisteredUser(long userId);

  void registerUserInfo(RegistrationUserDTO userDto);

  UserAttendance getAttendance(Long userId);

  void setAttendance(Long userId);

  void registerUserAndSetAttendance(RegistrationUserDTO userDto, Long userId);
}
