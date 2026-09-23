package com.streamingproxy.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${cors.allowed-origins}")
    private String allowedOriginsCsv;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOriginsCsv.split(","))
                .allowedMethods("GET")
                .allowedHeaders("Range", "Content-Type")
                .exposedHeaders("Content-Range", "Accept-Ranges", "Content-Length", "Content-Type");
    }
}
