package com.mementostudios.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;

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
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e) {
		// Extracts the first validation error message you defined in CreateBoothRequestDTO
		String errorMessage = e.getBindingResult().getFieldErrors().stream()
				.map(fieldError -> fieldError.getDefaultMessage())
				.findFirst()
				.orElse("Validation error occurred");
		ErrorResponse error = new ErrorResponse(errorMessage, HttpStatus.BAD_REQUEST.value());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

}
