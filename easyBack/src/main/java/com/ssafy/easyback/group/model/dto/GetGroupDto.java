package com.ssafy.easyback.group.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class GetGroupDto extends GroupDto {
  private int currentCount;
  private String leader;
  private String groupDate;

  public GetGroupDto(int groupId, String groupName, int limitCount, String description,
      String targetCycle, int targetTime) {
    super(groupId, groupName, limitCount, description, targetCycle, targetTime);
  }
}
