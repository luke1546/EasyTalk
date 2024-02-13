package com.ssafy.easyback.config;

import com.ssafy.easyback.interceptor.LoggingInterceptor;
import com.ssafy.easyback.interceptor.LoginCheckInterceptor;
import com.ssafy.easyback.social.model.service.KakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Autowired
  private KakaoService kakaoService;
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new LoggingInterceptor())
        .order(0)
        .addPathPatterns("/**");
    /*
    registry.addInterceptor(new LoginCheckInterceptor(kakaoService))
        .order(0)
        .addPathPatterns("/**")
        .excludePathPatterns("/home", "/login/**");
    */
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOriginPatterns("*") // '*'를 사용하는 대신 이렇게 변경
        .allowedMethods("*")
        .allowedHeaders("*")
        .allowCredentials(true)
        .maxAge(3600);
  }
}
