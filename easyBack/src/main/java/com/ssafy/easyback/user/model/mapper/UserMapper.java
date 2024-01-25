package com.ssafy.easyback.user.model.mapper;

import com.ssafy.easyback.user.model.dto.UserDto;

public interface UserMapper {

  UserDto selectUserInfobyId(Long userId);

  void insertUserInfo(UserDto userDto);
}
