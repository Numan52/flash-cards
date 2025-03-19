package org.example.gym.Security;

import com.google.gson.Gson;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.gym.Exception.ExceptionDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtAuthenticationProvider jwtAuthenticationProvider;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private static final Set<String> EXCLUDED_PATHS = Set.of("/auth/login", "/auth/register", "/auth/new-token");


    @Autowired
    public JwtAuthenticationFilter(JwtAuthenticationProvider jwtAuthenticationProvider) {
        this.jwtAuthenticationProvider = jwtAuthenticationProvider;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Gson gson = new Gson();
        Authentication authentication = null;

        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new JwtException("Missing Auth header");
            }

            String jwt = authHeader.substring(7);
            logger.info("received jwt: {}", jwt);
            Authentication unauthenticated = new UsernamePasswordAuthenticationToken(null, jwt, null);
            authentication = jwtAuthenticationProvider.authenticate(unauthenticated);

            if (authentication == null) {
                throw new JwtException("Invalid or missing jwt");
            }

        } catch (JwtException e) {
            logger.error("jwt exception: ", e);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(gson.toJson(new ExceptionDto(
                    request.getServletPath(), e.getMessage(), 401, LocalDateTime.now()
            )));
            return;
        }


        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        logger.info("jwt filter finished");
        filterChain.doFilter(request, response);
    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return EXCLUDED_PATHS.contains(request.getServletPath());
    }
}
