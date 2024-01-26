package com.ssafy.easyback.exhandler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ErrorResult {

  private String code;
  private String message;
}
