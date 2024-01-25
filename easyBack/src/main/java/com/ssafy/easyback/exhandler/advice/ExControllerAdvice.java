package com.ssafy.easyback.exhandler.advice;

import com.ssafy.easyback.exhandler.ErrorResult;
import com.ssafy.easyback.exhandler.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@Slf4j
@RestControllerAdvice
public class ExControllerAdvice {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthorizedException.class)
    public ErrorResult ExceptionHandler(UnauthorizedException e) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult(e.getCode(), e.getMessage());
    }
}
