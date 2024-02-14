package com.ssafy.easyback.user.model.service;

import com.ssafy.easyback.S3.model.service.S3UploadService;
import com.ssafy.easyback.config.PathUri;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import com.ssafy.easyback.user.model.dto.UserAttendance;
import com.ssafy.easyback.user.model.dto.RegistrationUserDTO;
import com.ssafy.easyback.user.model.dto.UserRegistrationStatus;
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

  final S3UploadService s3UploadService;
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
  public UserRegistrationStatus checkRegisteredUser(long userId, String phone) {
    ResponseUserDto userDto = this.getUserInfo(userId);

    if (userDto == null) {
      return UserRegistrationStatus.UNREGISTERED;
    }

    /** 비즈니스로직 폰 중복사용자 인지 체크하기 */
    if (phone != null && userMapper.selectUserbyPhoneNumber(phone)) {
      return UserRegistrationStatus.DUPLICATED;
    }

    return UserRegistrationStatus.REGISTERED;
  }

  /**
   * 회원가입 요청한 등록정보를 저장합니다
   *
   * @param userDto
   */
  @Override
  public void registerUserInfo(RegistrationUserDTO userDto) {

    if (userDto.getProfileImage().isEmpty()) {
      log.info("no File");
      userDto.setProfileImageUri(PathUri.PROFILE_IMAGE_URI + "default" + PathUri.IMAGE_EXTENSIONS);

    } else {
      userDto.setProfileImageUri(PathUri.PROFILE_IMAGE_URI + userDto.getUserId() + PathUri.IMAGE_EXTENSIONS);

      try {
        s3UploadService.saveFile(userDto.getProfileImage(), userDto.getProfileImageUri());
      } catch (Exception e) {
        e.printStackTrace();
      }
    }



    userMapper.insertUserInfo(userDto);

  }

  @Override
  public List<Integer> getAttendance(Long userId) {
    ResponseUserDto userDto = this.getUserInfo(userId);
    List<Integer> attendanceList = userMapper.selectAttendanceById(userId);

    return attendanceList;
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
    userMapper.addExp(userId);
  }

  @Override
  public void modifyUserInfo(RegistrationUserDTO userDto) {
    if (userDto.getProfileImage().isEmpty()) {
      log.info("no File");
    } else {
      userDto.setProfileImageUri(PathUri.PROFILE_IMAGE_URI + userDto.getUserId() + PathUri.IMAGE_EXTENSIONS);
      try {
        s3UploadService.saveFile(userDto.getProfileImage(), userDto.getProfileImageUri());
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    userMapper.modifyUserInfo(userDto);
  }
}
