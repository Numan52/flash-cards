package org.example.gym.Exception;


import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleMaxSizeException(Exception e, HttpServletRequest request) {
        logger.error("Exception: ", e);
        return ResponseEntity.status(500).body(new ExceptionDto(
                request.getServletPath(), "Unexpected Error occurred", 500, LocalDateTime.now()
        ));
    }


    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleNoSuchElementException(Exception e, HttpServletRequest request) {
        logger.error("Exception: ", e);
        return ResponseEntity.status(404).body(new ExceptionDto(
                request.getServletPath(), e.getMessage(), 404, LocalDateTime.now()
        ));
    }


    @ExceptionHandler(JwtException.class)
    public ResponseEntity<?> handleMaxSizeException(JwtException e, HttpServletRequest request) {
        logger.error("JwtException: ", e);
        return ResponseEntity.status(401).body(new ExceptionDto(
                request.getServletPath(), "Invalid or expired jwt", 401, LocalDateTime.now()
        ));
    }


}
