package com.ssafy.easyback.group.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class GroupInfoDto {
  int groupId;
  String groupName;
  int currentCount;
  int limitCount;
  String leader;
  String description;
  String targetCycle;
  int targetTime;
  String groupDate;
}
