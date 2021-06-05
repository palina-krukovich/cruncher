package com.pk.cruncher.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
@Profile("!develop")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final SecurityFilter securityFilter;
    private final SecurityProperties securityProperties;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public SecurityConfig(SecurityFilter securityFilter, SecurityProperties securityProperties) {
        this.securityFilter = securityFilter;
        this.securityProperties = securityProperties;
    }

    @Bean
    public AuthenticationEntryPoint getAuthenticationEntryPoint() {
        return (request, response, e) -> {
            Map<String, Object> errorObject = new HashMap<>();
            errorObject.put("error", HttpStatus.UNAUTHORIZED);
            errorObject.put("timestamp", OffsetDateTime.now());
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(objectMapper.writeValueAsString(errorObject));
        };
    }

    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(securityProperties.getAllowedOrigins());
        corsConfiguration.setAllowedHeaders(securityProperties.getAllowedHeaders());
        corsConfiguration.setAllowedMethods(securityProperties.getAllowedMethods());
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().configurationSource(corsConfigurationSource())
            .and().csrf().disable().formLogin().disable().httpBasic().disable()
            .exceptionHandling().authenticationEntryPoint(getAuthenticationEntryPoint())
            .and().authorizeRequests()
            .antMatchers("/public/**").permitAll()
            .anyRequest().hasAuthority("user")
            .and().addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
