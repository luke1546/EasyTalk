package com.ssafy.easyback.user.model.mapper;

import com.ssafy.easyback.user.model.dto.UserDto;
import java.util.List;

public interface UserMapper {

  UserDto selectUserbyId(Long userId);

  void insertUserInfo(UserDto userDto);

  List<Integer> selectAttendanceById(Long userId);

  int selectTodayAttendance(Long userId);

  void insertTodayAttendance(Long userID);
}
