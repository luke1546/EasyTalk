package com.ssafy.easyback.interceptor;

import com.ssafy.easyback.social.model.service.KakaoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@RequiredArgsConstructor
public class LoginCheckInterceptor implements HandlerInterceptor {

  final KakaoService kakaoService;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    HttpSession session = request.getSession();
    
    String access_token = (String) request.getSession().getAttribute("access_token");
    Long userId = kakaoService.validateAccessToken(access_token).block().getId();

    if ((Long) session.getAttribute("userId") != userId) {
      return false;
    }

    return true;
  }
}
