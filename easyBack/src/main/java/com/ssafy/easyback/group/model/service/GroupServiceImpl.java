package com.ssafy.easyback.group.model.service;

import com.ssafy.easyback.consts.SqlResultStatus;
import com.ssafy.easyback.group.model.GroupConst;
import com.ssafy.easyback.group.model.dto.CreateGroupDto;
import com.ssafy.easyback.group.model.dto.DescriptionDto;
import com.ssafy.easyback.group.model.dto.GetGroupDto;
import com.ssafy.easyback.group.model.dto.IsLeaderDto;
import com.ssafy.easyback.group.model.mapper.GroupMapper;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import com.ssafy.easyback.user.model.dto.UserAttendance;
import com.ssafy.easyback.user.model.mapper.UserMapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

  final GroupMapper groupMapper;
  final UserMapper userMapper;

  /**
   * 파라매터에따라
   *
   * @param params
   * @return
   */
  @Override
  public List<GetGroupDto> findGroupList(Map<String, Object> params) {
    return groupMapper.selectGroupList(params);
  }

  /**
   * 그룹 가입하기 채팅방에도 정보설정
   *
   * @param params
   * @return
   */
  @Override
  public HttpStatus joinGroupMember(Map<String, Object> params) {

    // 입력된 패스워드 일치확인
    if (!groupMapper.selectGroupPassword((int) params.get("groupId"))
        .equals((String) params.get("password"))) {
      return HttpStatus.BAD_REQUEST;
    }

    // 그룹의 역할 설정
    if ((String) params.get("role") == null) {
      params.put("role", GroupConst.ROLE_GROUP_MEMBER);
    }

    // 결과에 맞는 응답값 반환
    int resultStatus = groupMapper.insertGroupMember(params);
    return resultStatus == SqlResultStatus.SUCCESS ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
  }

  /**
   * 그룹 개설하기 그룹 개설이후 초기데이터 생성 * groups 그룹 테이블 * group_relationships 유저가 속한 그룹 관리테이블 * rooms 채팅방 테이블
   * * user_rooms 유저가 속한 채팅방 관리테이블 * 4개 테이블 모두 초기생성
   *
   * @param createGroupDto
   * @return
   */

  @Transactional
  @Override
  public HttpStatus createGroup(CreateGroupDto createGroupDto) {

    // 그룹 만들기
    groupMapper.insertGroup(createGroupDto);
    log.info("groupId={}", createGroupDto.getGroupId());

    // 유저와그룹간 관계 생성
    HashMap<String, Object> params = new HashMap<>();
    params.put("userId", createGroupDto.getUserId());
    params.put("groupId", createGroupDto.getGroupId());
    params.put("role", GroupConst.ROLE_GROUP_MASTER);
    groupMapper.insertGroupRelationship(params);

    // 채팅방 만들기
    params.put("roomName", createGroupDto.getGroupName());
    params.put("notice", "아직 공지가 없습니다");
    groupMapper.insertRoom(params);

    // 유저와 채팅방간 관리생성
    groupMapper.insertUserRoom(params);
    return HttpStatus.OK;
  }

  public List<UserAttendance> findGroupMemberAttendances(int groupId) {
    List<ResponseUserDto> userDtoList = groupMapper.findGroupMemberInfo(groupId);

    List<UserAttendance> userAttendanceList = new ArrayList<>();
    for (ResponseUserDto userDto : userDtoList) {
      List<Integer> attendanceList = userMapper.selectAttendanceById(
          userDto.getUserId());

      userAttendanceList.add(new UserAttendance(userDto, attendanceList));
    }

    return userAttendanceList;
  }

  public DescriptionDto findGroupDescription(int groupId) {
    log.info("aa{}=", groupMapper.selectGroupDescription(groupId).getDescription());
    return groupMapper.selectGroupDescription(groupId);
  }

  @Override
    public IsLeaderDto checkIsGroupLeader(int groupId, Long userId) {
    Map<String, Object> params = new HashMap<>();
    params.put("groupId", groupId);
    params.put("userId", userId);

    IsLeaderDto isLeaderDto = groupMapper.selectIsGroupLeader(params);

    return groupMapper.selectIsGroupLeader(params);

  }

}
