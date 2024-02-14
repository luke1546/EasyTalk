package com.ssafy.easyback.user.model.mapper;

import com.ssafy.easyback.user.model.dto.RegistrationUserDTO;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import java.util.List;

public interface UserMapper {

  ResponseUserDto selectUserbyId(Long userId);

  void insertUserInfo(RegistrationUserDTO userDto);

  List<Integer> selectAttendanceById(Long userId);

  int selectTodayAttendance(Long userId);

  void insertTodayAttendance(Long userID);

  boolean selectUserbyPhoneNumber(String phone);

  void modifyUserInfo(RegistrationUserDTO userDto);

    void addExp(Long userId);
}
