package com.ssafy.easyback.group.model.mapper;

import com.ssafy.easyback.group.model.dto.CreateGroupDto;
import com.ssafy.easyback.group.model.dto.DescriptionDto;
import com.ssafy.easyback.group.model.dto.GetGroupDto;
import com.ssafy.easyback.group.model.dto.IsLeaderDto;
import com.ssafy.easyback.group.model.dto.MessageDto;
import com.ssafy.easyback.user.model.dto.RegistrationUserDTO;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface GroupMapper {

  List<GetGroupDto> selectGroupList(Map<String, Object> params);

  int insertGroupMember(Map<String, Object> params);

  String selectGroupPassword(int groupId);

  int insertGroup(CreateGroupDto createGroupDto);

  int insertGroupRelationship(HashMap<String, Object> params);

  int insertRoom(HashMap<String, Object> params);

  int insertUserRoom(HashMap<String, Object> params);

  List<ResponseUserDto> findGroupMemberInfo(int groupId);

  DescriptionDto selectGroupDescription(int groupId);

  IsLeaderDto selectIsGroupLeader(Map<String, Object> params);

  void insertMessage(MessageDto messageDto);
}
