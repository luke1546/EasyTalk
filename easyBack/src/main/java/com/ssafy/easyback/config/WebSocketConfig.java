package com.ssafy.easyback.config;

import com.ssafy.easyback.interceptor.ChattingHandshakeInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration  // 스프링이 이 클래스를 설정 클래스로 인식하도록 합니다.
@EnableWebSocketMessageBroker  // 웹소켓 서버를 활성화합니다.
@Component
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Value("${easy.url}")
  private String easyUrl;
  @Override
  // 메시지 브로커 설정을 정의합니다.
  public void configureMessageBroker(MessageBrokerRegistry config) {

    // "/topic"을 시작으로 하는 대상에 대해 메시지 브로커가 메시지를 라우팅하도록 합니다.
    config.enableSimpleBroker("/topic");

    // "/app"을 시작으로 하는 대상이 애플리케이션의 어노테이션 기반 메시지 핸들러로 라우팅되도록 합니다.
    config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  // 웹소켓 엔드포인트를 등록합니다.
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    // "/websocket" 엔드포인트를 등록하고, SockJS를 사용하도록 설정합니다.
    // SockJS는 웹소켓을 지원하지 않는 브라우저에서도 백업 옵션을 제공하는 라이브러리입니다.
    registry.addEndpoint("/websocket")
        .addInterceptors(new ChattingHandshakeInterceptor())
        .withSockJS();
  }
}