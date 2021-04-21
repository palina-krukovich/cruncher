package com.pk.cruncher.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties("security")
@Data
public class SecurityProperties {
    private List<String> allowedHeaders;
    private List<String> allowedMethods;
    private List<String> allowedOrigins;
}
