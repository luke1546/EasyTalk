package com.ssafy.easyback.group.model.mapper;

import com.ssafy.easyback.group.model.dto.CreateGroupDto;
import com.ssafy.easyback.group.model.dto.GetGroupDto;
import com.ssafy.easyback.group.model.dto.GroupInfoDto;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;

public interface GroupMapper {
  List<GetGroupDto> selectGroupList(Map<String, Object> params);
  int insertGroupMember(Map<String, Object> params);
  String selectGroupPassword(int groupId);
  int insertGroup(CreateGroupDto createGroupDto);
  int insertGroupRelationship(HashMap<String, Object> params);
  int insertRoom(HashMap<String, Object> params);
  int insertUserRoom(HashMap<String, Object> params);
}
