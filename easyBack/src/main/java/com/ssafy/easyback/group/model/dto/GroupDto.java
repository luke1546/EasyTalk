package com.ssafy.easyback.group.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GroupDto {
  protected int groupId;
  protected String groupName;
  protected int limitCount;
  protected String description;
  protected String targetCycle;
  protected int targetTime;
}
