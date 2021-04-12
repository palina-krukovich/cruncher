package com.pk.cruncher.security.model;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

@Data
@Builder
public class Principal implements Serializable {
    private final static long serialVersionUID = -2881898482557818900L;

    private String uid;
    private String name;
    private String email;
    private boolean isEmailVerified;
    private String issuer;
    private String picture;
    private String tenantId;
    private Map<String, Object> claims;
}
