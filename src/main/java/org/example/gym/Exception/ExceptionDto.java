package org.example.gym.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;



public class ExceptionDto {
    private String path;
    private String errorMessage;
    private int errorCode;
    private String time;


    public ExceptionDto() {
    }

    public ExceptionDto(String path, String errorMessage, int errorCode, LocalDateTime time) {
        this.path = path;
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.time = time.toString();
    }


    public String getPath() {
        return path;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getTime() {
        return time;
    }
}
