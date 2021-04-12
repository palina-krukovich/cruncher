package com.pk.cruncher.security.model;

import com.google.firebase.auth.FirebaseToken;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Credentials {
    private FirebaseToken firebaseToken;
    private String token;
}
