package com.ssafy.easyback.config;

import com.ssafy.easyback.interceptor.LoginCheckInterceptor;
import com.ssafy.easyback.social.model.service.KakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Autowired
  private KakaoService kakaoService;
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    /*
    registry.addInterceptor(new LoginCheckInterceptor(kakaoService))
        .order(0)
        .addPathPatterns("/**")
        .excludePathPatterns("/home", "/login/**");
    */
  }
}
