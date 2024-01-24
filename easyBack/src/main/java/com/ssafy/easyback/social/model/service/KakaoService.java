package com.ssafy.easyback.social.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.easyback.social.KakaoConstants;
import com.ssafy.easyback.social.model.dto.KakaoToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
public class KakaoService {

    public KakaoToken getKakaoToken(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", KakaoConstants.API_KEY);
        params.add("redirect_uri", KakaoConstants.LOGIN_REDIRECT_URL);
        params.add("code", code);

        String responseBody = WebClient.builder()
                .baseUrl(KakaoConstants.KAUTH_URL)
                .build()
                .post()
                .uri(KakaoConstants.TOKEN_URI)
                .header(HttpHeaders.CONTENT_TYPE,
                        MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .body(BodyInserters.fromFormData(params))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoToken kakaoToken = null;

        try {
            kakaoToken = objectMapper.readValue(responseBody, KakaoToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        log.info("token={}",kakaoToken);
        return kakaoToken;
    }

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

        log.info(response);
        return response;

    }
}
