package org.example.gym.Controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.gym.Dtos.LoginRequest;
import org.example.gym.Dtos.RegistrationRequest;
import org.example.gym.Entities.User;
import org.example.gym.Exception.ExceptionDto;
import org.example.gym.Exception.UserException;
import org.example.gym.RoleType;
import org.example.gym.Security.JwtUtil;
import org.example.gym.Service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
public class AuthController {



    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private JwtUtil accessTokenUtil;
    private JwtUtil refreshTokenUtil;
    private UserService userService;


    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtil accessTokenUtil, JwtUtil refreshTokenUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.accessTokenUtil = accessTokenUtil;
        this.refreshTokenUtil = refreshTokenUtil;
        this.userService = userService;
    }


    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest) throws Exception {

        try {
            userService.saveUser(new User(
                            registrationRequest.getFirstName(),
                            registrationRequest.getLastName(),
                            registrationRequest.getUsername(),
                            registrationRequest.getPassword(),
                            registrationRequest.getEmail()
                    )
            );
            return ResponseEntity.ok("Registration successfull");

        } catch (UserException e) {
            return ResponseEntity.status(400).body(new ExceptionDto("/register", e.getMessage(), 400, LocalDateTime.now()));

        }

    }


    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        log.info("in Login");
        log.info("login request: {}", loginRequest);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()));
        } catch (BadCredentialsException e) {
            log.info("bad credentials");
            return ResponseEntity.status(401).body(new ExceptionDto(
                    "/login", "Incorrect credentials", 401, LocalDateTime.now())
            );
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

        String accessToken = accessTokenUtil.generateAccessToken(userDetails.getUsername(), List.of(RoleType.USER));
        String refreshToken = refreshTokenUtil.generateRefreshToken(userDetails.getUsername());

        Cookie cookie = new Cookie("refresh-token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);

        response.addCookie(cookie);

        log.info("SUCCESSful login. jwt: {}", accessToken);

        return ResponseEntity.ok()
                .body(Map.of("jwt", accessToken, "email", userDetails.getUsername()));
    }


    @GetMapping("/auth/new-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            log.info("no cookies found");
            return ResponseEntity.status(401).body(new ExceptionDto(
                    "/auth/new-token", "No refresh token found", 401, LocalDateTime.now()));
        }

        String refreshToken = null;
        for (Cookie cookie : cookies) {
            if ("refresh-token".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
            }
        }
        log.info("refresh token: {}", refreshToken);
        if (refreshToken == null) {
            log.info("refreshtoken is null");
            return ResponseEntity.status(401).body(new ExceptionDto(
                    "/auth/new-token", "No refresh token found", 401, LocalDateTime.now()));
        }

        String email = refreshTokenUtil.extractUsername(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        if (!refreshTokenUtil.validateToken(refreshToken, email)) {
            log.info("invalid refresh token");
            return ResponseEntity.status(401).body(new ExceptionDto(
                    "/auth/new-token", "Invalid or expired refresh token", 401, LocalDateTime.now()));
        }

        String newAccessToken = accessTokenUtil.generateAccessToken(userDetails.getUsername(), List.of(RoleType.USER));

        return ResponseEntity.ok()
                .body(Map.of("jwt", newAccessToken, "email", userDetails.getUsername()));
    }


    @GetMapping("/secured-endpoint")
    public ResponseEntity<?> securedEndpoint(HttpServletRequest request) {
        return ResponseEntity.ok(Map.of("kebap", "doner kebap"));
    }


    @PostMapping("/auth/logout")
    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh-token", null);

        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
}


