package com.mementostudios.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityFilterChainConfig {
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	public SecurityFilterChainConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}
	
	@Bean
	public SecurityFilterChain filter(HttpSecurity http) throws Exception{
		
		return http
				.csrf(csrf -> csrf.disable())
				.cors(Customizer.withDefaults())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth 
						
//						.requestMatchers(HttpMethod.GET, "/api").hasAnyRole("ADMIN", "HR")
//						.requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
//						.requestMatchers(HttpMethod.GET, "/api/")
			            .requestMatchers("/api/auth/**").permitAll()
			            .requestMatchers("/api/booth/**").permitAll()            // 🔓 Allowed without token
			            .requestMatchers("/api/boothAssignment/**").permitAll()  // 🔓 Allowed without token
			            .requestMatchers("/api/employee/**").permitAll() 
						.anyRequest().authenticated()
						
						)
			.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
			.build();
	}

}
