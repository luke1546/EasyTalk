package com.ssafy.easyback.group.model.service;

import com.ssafy.easyback.group.model.dto.CreateGroupDto;
import com.ssafy.easyback.group.model.dto.DescriptionDto;
import com.ssafy.easyback.group.model.dto.GetGroupDto;
import com.ssafy.easyback.group.model.dto.IsLeaderDto;
import com.ssafy.easyback.user.model.dto.UserAttendance;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;

public interface GroupService {

  List<GetGroupDto> findGroupList(Map<String, Object> params);

  HttpStatus joinGroupMember(Map<String, Object> params);

  HttpStatus createGroup(CreateGroupDto createGroupDto);

  List<UserAttendance> findGroupMemberAttendances(int groupId);

  DescriptionDto findGroupDescription(int groupId);

  IsLeaderDto checkIsGroupLeader(int groupId, Long userId);
}
