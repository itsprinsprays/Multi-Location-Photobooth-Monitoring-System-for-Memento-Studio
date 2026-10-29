package com.mementostudios.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(DuplicateResponseException.class)
	public ResponseEntity<ErrorResponse> duplicateException(DuplicateResponseException e) {
		ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.CONFLICT.value());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	private ResponseEntity<ErrorResponse> notFoundException(ResourceNotFoundException e) {
		ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

}
