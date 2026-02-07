package com.sumedh.rd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")          // all APIs
        		.allowedOrigins("http://localhost:5173") // frontend
        		.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedOrigins("*")        // all origins (frontend)
                .allowCredentials(false);
//                .allowedMethods("GET")      // ✅ ONLY GET allowed
//                .allowedHeaders("*");
    }
}

