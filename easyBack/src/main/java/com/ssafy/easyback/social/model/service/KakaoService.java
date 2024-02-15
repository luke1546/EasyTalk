package com.ssafy.easyback.social.model.service;

import com.ssafy.easyback.exhandler.UnauthorizedException;
import com.ssafy.easyback.social.KakaoConstants;
import com.ssafy.easyback.social.model.dto.KakaoToken;
import com.ssafy.easyback.social.model.dto.LoginResponseDto;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import com.ssafy.easyback.user.model.dto.UserRegistrationStatus;
import com.ssafy.easyback.user.model.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class KakaoService {

  final UserService userService;

  /**
   * 초기 로그인시 토큰을 발급받습니다.
   *
   * @param code
   * @return KakaoToken
   */
  public KakaoToken getKakaoToken(String code) {
    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "authorization_code");
    params.add("client_id", KakaoConstants.API_KEY);
    params.add("redirect_uri", KakaoConstants.LOGIN_REDIRECT_URL);
    params.add("code", code);
    log.info("LOGIN_REDIRECT_URL={}", KakaoConstants.LOGIN_REDIRECT_URL);
    return WebClient.builder()
        .baseUrl(KakaoConstants.KAUTH_URL)
        .build()
        .post()
        .uri(KakaoConstants.TOKEN_URI)
        .header(HttpHeaders.CONTENT_TYPE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE)
        .body(BodyInserters.fromFormData(params))
        .retrieve()
        .bodyToMono(KakaoToken.class)
        .block();
  }

  /**
   * token에대한 정보를 가져옵니다.
   *
   * @param accessToken
   * @return KakaoToken
   */
  public Mono<KakaoToken> validateAccessToken(String accessToken) {
    WebClient webClient = WebClient.builder()
        .baseUrl(KakaoConstants.KAPI_URL)
        .build();

    return webClient.get()
        .uri(KakaoConstants.VALIDATE_URI)
        .header("Authorization", "Bearer " + accessToken)
        .retrieve()
        .onStatus(httpStatus -> httpStatus == HttpStatus.UNAUTHORIZED, clientResponse ->
            Mono.error(new UnauthorizedException(HttpStatus.UNAUTHORIZED.toString(), "인증실패!"))
        )
        .bodyToMono(KakaoToken.class);
  }

  /**
   * 로그인한 유저의 고유Id를 가져옵니다.
   *
   * @param accessToken
   * @return userId
   */
  public Long getUserId(String accessToken) {
    return this.validateAccessToken(accessToken).block().getId();
  }

  public ResponseEntity<LoginResponseDto> login(String accessToken, HttpSession session) {
    Long userId = this.getUserId(accessToken);
    String phone = this.getUserPhoneNumber(userId);

    LoginResponseDto loginResponseDto = new LoginResponseDto();
    loginResponseDto.setUserId(userId);

    /**
     * 세션 값 저장해주기
     *    - 중복된 사용자 제외
     */
    UserRegistrationStatus userRegistrationStatus = userService.checkRegisteredUser(userId, phone);
    if (userRegistrationStatus != UserRegistrationStatus.DUPLICATED) {
      session.setAttribute("access_token", accessToken);
      session.setAttribute("userId", userId);
    }

    // 로그인 되어있으면 출석하기
    if (userRegistrationStatus == UserRegistrationStatus.REGISTERED) {
      userService.setAttendance(userId);
    }
    
    loginResponseDto.setUserRegistrationStatus(userRegistrationStatus);

    return ResponseEntity.ok().body(loginResponseDto);
  }

  private String getUserPhoneNumber(Long userId) {
    // 카카오로 요청보내서 핸드폰값 받아오기
    return "010-1234-1234";
  }


  /**
   * 토큰을 만료시킵니다.
   *
   * @param accessToken
   * @return
   */
  public String logout(String accessToken) {
    log.info("accessToken= {}", accessToken);
    WebClient webClient = WebClient.builder()
        .baseUrl(KakaoConstants.KAPI_URL)
        .build();

    String response = webClient.post()
        .uri(KakaoConstants.LOGOUT_URI)
        .header("Authorization", "Bearer " + accessToken)
        .retrieve()
        .bodyToMono(String.class)
        .block();

    return response;

  }
}
