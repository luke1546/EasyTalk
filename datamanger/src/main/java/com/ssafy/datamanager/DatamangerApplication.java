package com.ssafy.datamanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class DatamangerApplication {

	public static void main(String[] args) {
//		SpringApplication.run(DatamangerApplication.class, args);
		SpringApplicationBuilder builder = new SpringApplicationBuilder(DatamangerApplication.class);
		builder.headless(false);
		ConfigurableApplicationContext context = builder.run(args);
	}

}
