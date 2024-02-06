package com.ssafy.easyback.interceptor;

import static org.springframework.messaging.simp.stomp.StompHeaders.SESSION;

import jakarta.servlet.http.HttpSession;
import java.util.Map;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

public class ChattingHandshakeInterceptor implements HandshakeInterceptor {

  /**

   * @param request
   * @param response
   * @param wsHandler
   * @param attributes
   * @return
   * @throws Exception
   */
  @Override
  public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
      WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
    
    /**
     * 웹소켓통신중 유저데이터를 사용하기위해
     * 핸드셰이크 이전 로직실행
     */
    if(request instanceof ServerHttpRequest) {
      ServletServerHttpRequest serverHttpRequest = (ServletServerHttpRequest) request;
      HttpSession session = serverHttpRequest.getServletRequest().getSession();
      attributes.put(SESSION, session);
    }
    return true;
  }

  @Override
  public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
      WebSocketHandler wsHandler, Exception exception) {
  }
}
