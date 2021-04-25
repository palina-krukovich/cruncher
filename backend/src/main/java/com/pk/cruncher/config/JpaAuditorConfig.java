package com.pk.cruncher.config;

import com.pk.cruncher.security.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
public class JpaAuditorConfig {

    @Bean
    public AuditorAware<User> auditorProvider() {
        return () -> {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            return auth == null || !auth.isAuthenticated() ? Optional.empty() : Optional.of((User) auth.getPrincipal());
        };
    }

}
