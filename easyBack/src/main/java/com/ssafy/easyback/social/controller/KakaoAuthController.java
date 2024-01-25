package com.ssafy.easyback.social.controller;

import com.ssafy.easyback.social.KakaoConstants;
import com.ssafy.easyback.social.model.service.KakaoService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

    kakaoService.validateAccessToken((String) session.getAttribute("access_token"));
    log.info("access_token={}", (String) session.getAttribute("access_token"));
    return "redirect:/user/registration-check";
  }

  @ResponseBody
  @GetMapping("logout")
  public String logout(HttpSession session) {
    return kakaoService.logout((String) session.getAttribute("access_token"));
  }

  @GetMapping("/mypage")
  public String renderMyPage(Model model, HttpSession session) {
    model.addAttribute("access_token", session.getAttribute("access_token"));
    kakaoService.validateAccessToken((String) session.getAttribute("access_token"));
    return "mypage";
  }
}
