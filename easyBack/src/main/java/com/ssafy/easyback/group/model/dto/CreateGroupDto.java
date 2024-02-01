package com.ssafy.easyback.group.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class CreateGroupDto {

  Long userId;
  int groupId;
  @Size(min=6, max=6, message = "bad Request")
  String password;

  @NotNull
  String groupName;
  int limitCount;
  String description;
  String targetCycle;
  int targetTime;
}
