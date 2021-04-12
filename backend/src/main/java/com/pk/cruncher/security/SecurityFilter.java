package com.pk.cruncher.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.pk.cruncher.security.model.Credentials;
import com.pk.cruncher.security.model.Principal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

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
        verifyToken(request);
        chain.doFilter(request, response);
    }

    private void verifyToken(HttpServletRequest request) {
        String token = getBearerToken(request);
        if (token == null || token.isBlank()) return;
        try {
            FirebaseToken firebaseToken = firebaseAuth.verifyIdToken(token);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                getPrincipal(firebaseToken), getCredentials(firebaseToken, token), getAuthorities(firebaseToken));
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (FirebaseAuthException e) {
            log.error(e.getMessage(), e);
        }
    }

    private String getBearerToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        return token != null && token.startsWith("Bearer ") ? token.substring(7) : null;
    }

    private Principal getPrincipal(FirebaseToken firebaseToken) {
        return Principal.builder()
            .uid(firebaseToken.getUid())
            .name(firebaseToken.getName())
            .email(firebaseToken.getEmail())
            .isEmailVerified(firebaseToken.isEmailVerified())
            .issuer(firebaseToken.getIssuer())
            .picture(firebaseToken.getPicture())
            .tenantId(firebaseToken.getTenantId())
            .claims(firebaseToken.getClaims())
            .build();
    }

    private Credentials getCredentials(FirebaseToken firebaseToken, String token) {
        return Credentials.builder()
            .firebaseToken(firebaseToken)
            .token(token)
            .build();
    }

    private List<GrantedAuthority> getAuthorities(FirebaseToken firebaseToken) {
        String authority = (String) firebaseToken.getClaims().get("authority");
        return authority == null ? null : Collections.singletonList(new SimpleGrantedAuthority(authority));
    }

}
