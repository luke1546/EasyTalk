package com.ssafy.easyback.group.model.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class CreateGroupDto {

  @Size(min=6, max=6, message = "길이를 맞춰줘")
  String password;
  String groupName;
  int limitCount;
  String description;
  String targetCycle;
  int targetTime;
}
