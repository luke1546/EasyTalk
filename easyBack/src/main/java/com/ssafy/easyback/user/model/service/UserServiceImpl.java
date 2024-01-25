package com.ssafy.easyback.user.model.service;

import com.ssafy.easyback.user.model.dto.UserDto;
import com.ssafy.easyback.user.model.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  public final UserMapper userMapper;

  @Override
  public UserDto getUserInfo(Long userId) {
    return userMapper.selectUserInfobyId(userId);
  }

  /**
   * 이미등록되어있는 유저인지 확인합니다.
   *
   * @param userId
   * @return
   */
  @Override
  public HttpStatus checkRegisteredUser(long userId) {
    UserDto userDto = this.getUserInfo(userId);

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
  public void registerUserInfo(UserDto userDto) {
    /*
      파일서버에 저장하는 로직
      myFileSerer.save("/user/profile/image{userDto.getUserID}.jpg");
    */
    userMapper.insertUserInfo(userDto);
  }

}
