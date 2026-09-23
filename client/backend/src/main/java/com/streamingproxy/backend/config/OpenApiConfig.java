package com.streamingproxy.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(info = @Info(
        title = "Streaming Proxy Backend API",
        version = "1.0.0",
        description = "Bridges the React frontend and the Node.js streaming proxy. Never exposes upstream video URLs to the browser."
))
@Configuration
public class OpenApiConfig {
}
