package com.mementostudios.demo.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component("util")
public class JwtUtil {

	
	@Value("${jwt.secret}")
	public String secret;
	
	@Value("${jwt.accessExpiration}")
	public long accessExpiration;
	
	@Value("${jwt.refreshExpiration}")
	public long refreshExpiration;
	
	public SecretKey SECRET;
	
	@PostConstruct
	public void gitinit() {
		this.SECRET = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));	
	}
	
	public String generateToken(String username, String role, Integer employeeId) {
		return Jwts.builder()
				.claim(Claims.SUBJECT, username)
				.claim("role", role)
				.claim("employeeId", employeeId)
				.claim("type", "access")
				.claim(Claims.ISSUED_AT, new Date())
				.claim(Claims.EXPIRATION, new Date(System.currentTimeMillis() + accessExpiration))
				.signWith(SECRET)
				.compact();
	}
	
	public String refreshGenerateToken(String username) {
		return Jwts.builder()
				.claim(Claims.SUBJECT, username)
				.claim("type", "refresh")
				.claim(Claims.ISSUED_AT, new Date())
				.claim(Claims.EXPIRATION, new Date(System.currentTimeMillis() + refreshExpiration))
				.signWith(SECRET)
				.compact();			
	}
	
	public boolean validateToken(String token) {
		try {
			Jwts.parser()
				.verifyWith(SECRET)
				.build()
				.parseSignedClaims(token);
				return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}
	
	public Claims extractAllClaims(String token) {
		return Jwts.parser()
				.verifyWith(SECRET)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
	public String extractUsername(String token) {
		return extractAllClaims(token).getSubject();
	}
	
	public String extractRole(String token) {
		return (String) extractAllClaims(token).get("role");
	}
}
