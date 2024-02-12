package com.ssafy.easyback.social.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoToken {

  private String access_token;
  private String refresh_token;
  private String token_type;
  private int expires_in;

  private Long id;


  private String scope;
  private int refresh_token_expires_in;
}