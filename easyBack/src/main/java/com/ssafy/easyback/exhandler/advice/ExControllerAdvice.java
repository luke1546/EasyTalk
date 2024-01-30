package com.ssafy.easyback.exhandler.advice;

import com.ssafy.easyback.exhandler.ErrorResult;
import com.ssafy.easyback.exhandler.UnauthorizedException;
import jdk.jshell.spi.ExecutionControl.InternalException;
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
    public ErrorResult unAuthorizedExHandler(UnauthorizedException e) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult(e.getCode(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult internalServerErrorExHandler(RuntimeException e) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("error", "error");
    }
}
