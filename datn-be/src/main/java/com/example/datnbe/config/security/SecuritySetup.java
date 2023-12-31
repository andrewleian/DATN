package com.example.datnbe.config.security;


import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
public class SecuritySetup {

    private final AuthenticationProvider authenticationProvider;
    private final AccountFilter accountFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .cors()
                .and()
                .csrf()
                    .disable()
                .authorizeHttpRequests()
                    .antMatchers("/api/v1/customer/**").hasAuthority("CUSTOMER")
                    .antMatchers("/api/v1/account/**").hasAnyAuthority("STAFF","DIRECTOR","CUSTOMER")
                    .antMatchers("/api/v1/staff/**").hasAnyAuthority("STAFF","DIRECTOR")
                    .antMatchers("/api/v1/director/**").hasAuthority("DIRECTOR")
                    .antMatchers("/api/v1/staff/**", "/api/v1/director/**", "/api/v1/account/**")
                    .authenticated()
                .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(accountFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
