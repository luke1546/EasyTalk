package com.ssafy.easyback.social;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KakaoConstants {


  public static final String KAUTH_URL = "https://kauth.kakao.com";
  public static final String KAPI_URL = "https://kapi.kakao.com";
  public static final String AUTH_URI = "/oauth/authorize";
  public static final String TOKEN_URI = "/oauth/token";
  public static final String LOGOUT_URI = "/v1/user/logout";
  public static final String VALIDATE_URI = "/v1/user/access_token_info";

  public static String API_KEY;
  public static String LOGIN_REDIRECT_URL;

  @Value("${kakao.api_key}")
  private String tempApiKey;
  @Value("${easy.url}${kakao.login_redirect_uri}")
  private String tempLoginRedirectUrl;

  @PostConstruct
  public void init() {
    API_KEY = tempApiKey;
    LOGIN_REDIRECT_URL = tempLoginRedirectUrl;
  }
}
