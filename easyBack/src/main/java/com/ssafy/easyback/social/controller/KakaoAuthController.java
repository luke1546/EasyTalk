package com.ssafy.easyback.social.controller;

import com.ssafy.easyback.social.model.dto.LoginResponseDto;
import com.ssafy.easyback.social.model.service.KakaoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@Slf4j
public class KakaoAuthController {

  private final KakaoService kakaoService;

  /**
   * 카카오 서버가 리다이렉트해준 uri 토큰을 가져옴
   *
   * @return
   */

  @GetMapping("/login/oauth/kakao")
  public ResponseEntity<LoginResponseDto> login(HttpServletRequest request, HttpSession session) {
    log.info(" 프론트 /login/oauth/kakao 가보낸 code={}", request.getParameter("code"));

    return kakaoService.login(
        kakaoService.getKakaoToken(request.getParameter("code")).getAccess_token(), session);
  }


  @ResponseBody
  @GetMapping("/logout")
  public String logout(HttpSession session) {
    kakaoService.logout((String) session.getAttribute("access_token"));
    session.invalidate();

    return "로그아웃 완료";
  }

  @GetMapping("/mypage")
  public String renderMyPage(Model model, HttpSession session) {
    model.addAttribute("access_token", session.getAttribute("access_token"));
    kakaoService.validateAccessToken((String) session.getAttribute("access_token")).block();
    return "mypage";
  }

}
