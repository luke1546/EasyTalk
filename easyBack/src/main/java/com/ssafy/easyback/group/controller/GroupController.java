package com.ssafy.easyback.group.controller;

import com.ssafy.easyback.exhandler.ErrorResult;
import com.ssafy.easyback.group.model.dto.CreateGroupDto;
import com.ssafy.easyback.group.model.dto.GetGroupDto;
import com.ssafy.easyback.group.model.dto.GroupInfoDto;
import com.ssafy.easyback.group.model.service.GroupService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/group")
@Slf4j
@RequiredArgsConstructor
public class GroupController {

  final GroupService groupService;

  /**
   * 그룹리스트 조회 내가 가입한 그룹리스 / 입력한 키워드로 검색한 그룹 리스트
   *
   * @param keyword
   * @param session
   * @return
   */
  @GetMapping
  public ResponseEntity<Object> readGroupList(
      @RequestParam(value = "keyword", required = false) String keyword, HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");

    Map<String, Object> params = new HashMap<>();
    params.put("userId", userId);
    params.put("keyword", keyword);
    List<GetGroupDto> groupList = groupService.findGroupList(params);
    log.info("groupList={}", groupList);
    return ResponseEntity.ok().body(groupList);
  }

  /**
   * 그룹 개설 * groups 그룹 테이블 * group_relationships 유저가 속한 그룹 관리테이블 * rooms 채팅방 테이블 * user_rooms 유저가 속한
   * 채팅방 관리테이블 * 4개 테이블 모두 초기생성
   *
   * @param createGroupDto
   * @param bindingResult
   * @param session
   * @return
   */
  @PostMapping
  public ResponseEntity<Object> createGroup(@Validated @RequestBody CreateGroupDto createGroupDto,
      BindingResult bindingResult, HttpSession session) {

    // 사용자 입력값 검증
    if (bindingResult.hasErrors()) {
      HttpStatus resultStatus = HttpStatus.BAD_REQUEST;
      ErrorResult errorResult = new ErrorResult(resultStatus.toString(),
          resultStatus.getReasonPhrase());

      return ResponseEntity.status(resultStatus).body(errorResult);
    }

    createGroupDto.setUserId((Long) session.getAttribute("userId"));
    HttpStatus resultStatus = groupService.createGroup(createGroupDto);

    return ResponseEntity.status(resultStatus).build();
  }

  /**
   * 그룹 가입 신청로직
   *
   * @param groupId
   * @param password
   * @param session
   * @return
   */
  @PostMapping("/{groupId}/join")
  public ResponseEntity<HttpStatus> createGroupMember(@PathVariable("groupId") int groupId,
      @RequestBody String password,
      HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");

    log.info("password={}", password);

    Map<String, Object> params = new HashMap<>();
    params.put("userId", userId);
    params.put("groupId", groupId);
    params.put("password", password);

    HttpStatus resultStatus = groupService.joinGroupMember(params);

    return ResponseEntity.status(resultStatus).build();
  }

  @GetMapping("/{groupId}/attendance")
  public ResponseEntity<Object> readAttendanceInfos(@PathVariable("groupId") int groupId) {

    return ResponseEntity.status(HttpStatus.OK)
        .body(groupService.findGroupMemberAttendances(groupId));
  }

  @GetMapping("/{groupId}/description")
  public ResponseEntity<Object> readGroupDescription(@PathVariable("groupId") int groupId) {
    return ResponseEntity.status(HttpStatus.OK)
        .body(groupService.findGroupDescription(groupId));
  }

  @GetMapping("/{groupId}/leader")
  public ResponseEntity<Object> readIsGroupLeader(@PathVariable("groupId") int groupId,
      HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");

    return ResponseEntity.status(HttpStatus.OK)
        .body(groupService.checkIsGroupLeader(groupId, userId));
  }
}
