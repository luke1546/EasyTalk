package com.ssafy.easyback.user.model.service;

import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import com.ssafy.easyback.user.model.dto.UserAttendance;
import com.ssafy.easyback.user.model.dto.RegistrationUserDTO;
import com.ssafy.easyback.user.model.mapper.UserMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

  public final UserMapper userMapper;

  @Override
  public ResponseUserDto getUserInfo(Long userId) {
    return userMapper.selectUserbyId(userId);
  }

  /**
   * 이미등록되어있는 유저인지 확인합니다.
   *
   * @param userId
   * @return
   */
  @Override
  public HttpStatus checkRegisteredUser(long userId) {
    ResponseUserDto userDto = this.getUserInfo(userId);

    if (userDto == null) {
      return HttpStatus.UNAUTHORIZED;
    }

    return HttpStatus.OK;
  }

  /**
   * 회원가입 요청한 등록정보를 저장합니다
   *
   * @param userDto
   */
  @Override
  public void registerUserInfo(RegistrationUserDTO userDto) {
    /*
      파일서버에 저장하는 로직
      myFileSerer.save("/user/profile/image{userDto.getUserID}.jpg");
    */
    userMapper.insertUserInfo(userDto);
  }

  @Override
  public UserAttendance getAttendance(Long userId) {
    ResponseUserDto userDto = this.getUserInfo(userId);
    List<Integer> attendanceList = userMapper.selectAttendanceById(userId);

    return new UserAttendance(userDto, attendanceList);
  }

  @Override
  public void setAttendance(Long userId) {
    final int ALREADY_CHECKED = 1;
    if (userMapper.selectTodayAttendance(userId) == ALREADY_CHECKED) {
      return;
    }

    userMapper.insertTodayAttendance(userId);
  }

  @Transactional
  public void registerUserAndSetAttendance(RegistrationUserDTO userDto, Long userId) {
    registerUserInfo(userDto);
    setAttendance(userId);
  }
}
