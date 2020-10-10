package by.bsuir.training.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private static final String ERROR = "errorMessage";

    @ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Data not found")
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleIOException(Exception ex, Model model){
        model.addAttribute(ERROR, ex.getMessage());
        ex.printStackTrace();
        logger.error(ex.getMessage());
        return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
    }


}
