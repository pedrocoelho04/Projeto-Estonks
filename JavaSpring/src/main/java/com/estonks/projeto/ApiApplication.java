package com.estonks.projeto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		// Carrega as variáveis do arquivo .env
		Dotenv dotenv = Dotenv.load();

		// Expõe cada variável do .env como uma Propriedade de Sistema do Java
		dotenv.entries().forEach(entry -> {
			System.setProperty(entry.getKey(), entry.getValue());
		});
		//Iniciar aplicação
		SpringApplication.run(ApiApplication.class, args);
	}

}