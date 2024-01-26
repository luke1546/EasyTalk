package com.ssafy.easyback.user.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserAttendance {

  UserDto userDto;
  List<Integer> attendanceList;
//  int attendanceList;
}
