package com.pk.cruncher.config;

import com.google.firebase.auth.FirebaseToken;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

@Data
public class User implements Serializable {
    private final static long serialVersionUID = -2881898482557818900L;

    private final String uid;
    private final String name;
    private final String email;
    private final boolean isEmailVerified;
    private final String issuer;
    private final String picture;
    private final String tenantId;
    private final Map<String, Object> claims;

    public User(FirebaseToken token) {
        uid = token.getUid();
        name = token.getName();
        email = token.getEmail();
        isEmailVerified = token.isEmailVerified();
        issuer = token.getIssuer();
        picture = token.getPicture();
        tenantId = token.getTenantId();
        claims = token.getClaims();
    }
}
