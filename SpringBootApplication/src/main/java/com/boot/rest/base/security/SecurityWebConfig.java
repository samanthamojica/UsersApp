package com.boot.rest.base.security;

import static org.springframework.security.config.Customizer.withDefaults;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityWebConfig {
	
	private final KeycloakJwtAuthenticationConverter keyCloackConverter;

	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         http
                 .cors(withDefaults())
                 .csrf(AbstractHttpConfigurer::disable)
                 .authorizeHttpRequests(req ->
                            req.requestMatchers("/actuator/health").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/user/admin").hasAnyRole("admin")
                            .requestMatchers(HttpMethod.GET, "/api/v1/**").hasAnyRole("GET","usuario")
                            .requestMatchers(HttpMethod.POST, "/api/v1/**").hasAnyRole("POST")
                            .requestMatchers(HttpMethod.PUT, "/api/v1/**").hasAnyRole("PUT")
                            .requestMatchers(HttpMethod.DELETE, "/api/v1/**").hasAnyRole("admin","DELETE")
                            .anyRequest().authenticated()
                 )
                .oauth2ResourceServer(auth ->
                        auth.jwt(token -> token.jwtAuthenticationConverter(keyCloackConverter)));

        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
	 }
}

