package com.ssafy.easyback.user.model.service;

import com.ssafy.easyback.user.model.dto.UserAttendance;
import com.ssafy.easyback.user.model.dto.UserDto;
import java.util.List;
import org.springframework.http.HttpStatus;

public interface UserService {

  UserDto getUserInfo(Long userId);

  HttpStatus checkRegisteredUser(long userId);

  void registerUserInfo(UserDto userDto);

  UserAttendance getAttendance(Long userId);

  void setAttendance(Long userId);

  void registerUserAndSetAttendance(UserDto userDto, Long userId);
}
