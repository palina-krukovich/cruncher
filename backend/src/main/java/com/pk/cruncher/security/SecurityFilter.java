package com.pk.cruncher.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class SecurityFilter extends OncePerRequestFilter {

    private final FirebaseAuth firebaseAuth;

    public SecurityFilter(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {
        try {
            FirebaseToken token = firebaseAuth.verifyIdToken(getBearerToken(request));
            var auth = new UsernamePasswordAuthenticationToken(new User(token), token);
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (Exception e) {
            log.warn(e.getMessage(), e);
        }
        chain.doFilter(request, response);
    }

    private String getBearerToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        return token != null && token.startsWith("Bearer ") ? token.substring(7) : null;
    }
}
