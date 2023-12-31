package com.example.datnbe.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class ComponentConfiguration {
	//Committed
	@Bean
	public ModelMapper initModelMapper() {
		return new ModelMapper();
	}

}

