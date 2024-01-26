package com.ssafy.easyback.exhandler;

import lombok.Getter;

@Getter
public class UnauthorizedException extends RuntimeException {

  private String code;

  public UnauthorizedException(String code, String message) {
    super(message);
    this.code = code;
  }

}
