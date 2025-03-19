package org.example.gym.Security;

import org.example.gym.Entities.User;
import org.example.gym.Repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private JwtUtil accessTokenUtil;
    private UserDetailsService userDetailsService;

    public JwtAuthenticationProvider(JwtUtil accessTokenUtil, UserDetailsService userDetailsService) {
        this.accessTokenUtil = accessTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = (String) authentication.getCredentials();
        String email = accessTokenUtil.extractUsername(token);

        if (email != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            if (accessTokenUtil.validateToken(token, email)) {
                return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            }
        }
        return null;

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }


    static CompletableFuture<String> getUserDetailsAsync(String userId) {
        return CompletableFuture.supplyAsync(() -> "User Details for userId " + userId);
    }

    public static void main(String[] args) throws InterruptedException {

    }
}

