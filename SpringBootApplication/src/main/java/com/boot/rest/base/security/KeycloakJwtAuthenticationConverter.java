package com.boot.rest.base.security;

import static java.util.stream.Collectors.toSet;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import lombok.extern.slf4j.Slf4j;


@Configuration
@Slf4j
public class KeycloakJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
	
	@Value("${keycloak.resource-id}")
	private String resource;
	
	@Value("${keycloak.principal-attribute}")
	private String principalAtrribute;
	
    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt source) {
        return new JwtAuthenticationToken(
                source,
                Stream.concat(
                                new JwtGrantedAuthoritiesConverter().convert(source).stream(),
                                extractResourceRoles(source).stream())
                        .collect(toSet()), 
                getPrincipalClaimName(source));
    }

    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
        var resourceAccess = new HashMap<>(jwt.getClaim("resource_access"));
        
        if(resourceAccess.get(resource) == null) {
        	return Set.of();
        }

        var javaClient = (Map<String, List<String>>) resourceAccess.get(resource);

        var rolesJavaApp = javaClient.get("roles");
        
        Set<SimpleGrantedAuthority> javaAppRoles = rolesJavaApp.stream()
        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.replace("-", "_")))
        .peek(role -> log.info("Role in petition {}",role.toString()))
        .collect(toSet());

        return javaAppRoles;
    }
    
    private String getPrincipalClaimName(Jwt jwt) {
    	String claimName = JwtClaimNames.SUB;
    	if(principalAtrribute != null) {
    		claimName = principalAtrribute;
    	}
    	return jwt.getClaim(claimName);
    }
    
}