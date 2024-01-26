package com.ssafy.easyback.social.controller;

import com.ssafy.easyback.exhandler.ErrorResult;
import com.ssafy.easyback.exhandler.UnauthorizedException;
import com.ssafy.easyback.social.KakaoConstants;
import com.ssafy.easyback.social.model.dto.KakaoToken;
import com.ssafy.easyback.social.model.service.KakaoService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Controller
@RequiredArgsConstructor
@Slf4j
public class KakaoAuthController {

  private final KakaoService kakaoService;

  /**
   * @return loginURI
   */
  @GetMapping("/login")
  public String requestLoginForm() {
    StringBuffer loginUrl = new StringBuffer();
    loginUrl.append(KakaoConstants.KAUTH_URL);
    loginUrl.append(KakaoConstants.AUTH_URI);
    loginUrl.append("?response_type=code");
    loginUrl.append("&client_id=" + KakaoConstants.API_KEY);
    loginUrl.append("&redirect_uri=" + KakaoConstants.LOGIN_REDIRECT_URL);

    return "redirect:" + loginUrl.toString();
  }

  /**
   * 카카오 서버가 리다이렉트해준 uri 토큰을 가져옴
   *
   * @return
   */
  @GetMapping("/login/oauth/kakao")
  public String login(@RequestParam("code") String code, HttpSession session) {
    session.setAttribute("access_token", kakaoService.getKakaoToken(code).getAccess_token());

    KakaoToken kakaoToken = kakaoService.validateAccessToken(
        (String) session.getAttribute("access_token")).block();
    
    log.info("access_token={}", session.getAttribute("access_token"));
    log.info("userId={}", kakaoToken.getId());
    session.setAttribute("userId", kakaoToken.getId());

    return "redirect:/user/registration-check";
  }

  @ResponseBody
  @GetMapping("logout")
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
