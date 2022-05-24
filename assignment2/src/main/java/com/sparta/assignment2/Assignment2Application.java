package com.sparta.assignment2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Assignment2Application {

	public static void main(String[] args) {
		SpringApplication.run(Assignment2Application.class, args);
	}

}
