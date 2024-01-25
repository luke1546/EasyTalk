package com.ssafy.easyback.social.model.service;

import com.ssafy.easyback.exhandler.UnauthorizedException;
import com.ssafy.easyback.social.KakaoConstants;
import com.ssafy.easyback.social.model.dto.KakaoToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class KakaoService {


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

    KakaoToken kakaoToken = WebClient.builder()
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

    return kakaoToken;
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

  /**
   * 토큰을 만료시킵니다.
   *
   * @param accessToken
   * @return
   */
  public String logout(String accessToken) {
    log.info(accessToken);
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
