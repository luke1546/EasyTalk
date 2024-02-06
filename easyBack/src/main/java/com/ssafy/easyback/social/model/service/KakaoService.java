package com.ssafy.easyback.social.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.easyback.exhandler.UnauthorizedException;
import com.ssafy.easyback.social.KakaoConstants;
import com.ssafy.easyback.social.model.dto.KakaoToken;
import com.ssafy.easyback.social.model.dto.LoginResponseDto;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import com.ssafy.easyback.user.model.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
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

//  @Transactional
//  public KakaoToken getKakaoToken(String code) {
//
//    HttpHeaders headers = new HttpHeaders();
//    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//    log.info("redirect={}", KakaoConstants.LOGIN_REDIRECT_URL);
//    // Http Response Body 객체 생성
//    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//    params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
//    params.add("client_id", KakaoConstants.API_KEY); // 카카오 Dev 앱 REST API 키
//    params.add("redirect_uri", KakaoConstants.LOGIN_REDIRECT_URL); // 카카오 Dev redirect uri
//    params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값
//
//
//    // 헤더와 바디 합치기 위해 Http Entity 객체 생성
//    HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
//
//    // 카카오로부터 Access token 받아오기
//    RestTemplate rt = new RestTemplate();
//    ResponseEntity<String> accessTokenResponse = rt.exchange(
//        KakaoConstants.KAUTH_URL + KakaoConstants.TOKEN_URI, // "https://kauth.kakao.com/oauth/token"
//        HttpMethod.POST,
//        kakaoTokenRequest,
//        String.class
//    );
//
//    // JSON Parsing (-> KakaoTokenDto)
//    ObjectMapper objectMapper = new ObjectMapper();
//    objectMapper.registerModule(new JavaTimeModule());
//    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//    KakaoToken kakaoToken = null;
//    try {
//      kakaoToken = objectMapper.readValue(accessTokenResponse.getBody(), KakaoToken.class);
//    } catch (JsonProcessingException e) {
//      e.printStackTrace();
//    }
//
//    return kakaoToken;
//  }

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

    LoginResponseDto loginResponseDto = new LoginResponseDto();
    loginResponseDto.setLoginSuccess(false);
    loginResponseDto.setUserId(userId);

    ResponseUserDto userDto = userService.getUserInfo(userId);
    if (userDto != null) {
      log.info("이미 정보가있는 유저 userId={}", userDto.getUserId());

      loginResponseDto.setLoginSuccess(true);
      session.setAttribute("accessToken", accessToken);
    }

    return ResponseEntity.ok().body(loginResponseDto);
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
