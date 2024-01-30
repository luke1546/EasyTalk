package com.ssafy.easyback.group.model.service;

import com.ssafy.easyback.consts.SqlResultStatus;
import com.ssafy.easyback.group.model.GroupConst;
import com.ssafy.easyback.group.model.dto.CreateGroupDto;
import com.ssafy.easyback.group.model.dto.GetGroupDto;
import com.ssafy.easyback.group.model.dto.GroupInfoDto;
import com.ssafy.easyback.group.model.mapper.GroupMapper;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

  final GroupMapper groupMapper;

  /**
   * 파라매터에따라
   * @param params
   * @return
   */
  @Override
  public List<GetGroupDto> findGroupList(Map<String, Object> params) {
    return groupMapper.selectGroupList(params);
  }

  /**
   * 그룹 가입하기
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
   * 그룹 개설하기
   * @param createGroupDto
   * @return
   */
  @Override
  public HttpStatus createGroup(CreateGroupDto createGroupDto) {
    int resultStatus = groupMapper.insertGroup(createGroupDto);

    return resultStatus == SqlResultStatus.SUCCESS ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
  }


}
