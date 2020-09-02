package by.bsuir.courseproject.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private static final String ERROR = "errorMessage";

    private static final String ERROR_PAGE = "error";
    private static final String ERROR_MESSAGE = "errorMessage";

    @ResponseStatus(value= HttpStatus.NOT_FOUND, reason="IOException occured")
    @ExceptionHandler(Exception.class)
    public String handleIOException(Exception ex, Model model){
        model.addAttribute(ERROR, ex.getMessage());
        ex.printStackTrace();
        logger.error(ex.getMessage());
        return "error";
    }


}
