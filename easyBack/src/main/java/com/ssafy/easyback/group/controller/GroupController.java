package com.ssafy.easyback.group.controller;

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
   * 그룹리스트 조회
   * 내가 가입한 그룹리스 / 입력한 키워드로 검색한 그룹 리스트
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
   * 그룹 개설
   * @param createGroupDto
   * @param bindingResult
   * @param session
   * @return
   */
  @PostMapping
  public ResponseEntity<Object> createGroup(@Validated @ModelAttribute("CreateGroupDto")
      CreateGroupDto createGroupDto, BindingResult bindingResult, HttpSession session) {

    if (bindingResult.hasErrors()) {
      List<String> errorMessages = bindingResult.getAllErrors()
          .stream()
          .map(ObjectError::getDefaultMessage)
          .collect(Collectors.toList());
      return ResponseEntity.badRequest().body(errorMessages);
    }

    HttpStatus resultStatus = groupService.createGroup(createGroupDto);

    return ResponseEntity.status(resultStatus).build();
  }
  /**
   * 그룹 가입 신청로직
   * @param groupId
   * @param password
   * @param session
   * @return
   */
  @PostMapping("/{groupId}/join")
  public ResponseEntity<HttpStatus> createGroupMember(@PathVariable("groupId") int groupId,
      @RequestParam("password") String password,
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
}
