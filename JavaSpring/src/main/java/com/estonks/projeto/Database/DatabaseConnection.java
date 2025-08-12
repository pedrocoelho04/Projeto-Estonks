package com.estonks.projeto.Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConnection {
  @Value("${spring.datasource.url}")
  private String url;

  @Value("${spring.datasource.username}")
  private String usuario;

  @Value("${spring.datasource.password}")
  private String senha;

  public Connection connect(){
    try {
        System.out.println(url + usuario + senha);
        Class.forName("org.postgresql.Driver");
        Connection conexao = DriverManager.getConnection(url, usuario, senha);
        System.out.println("Conexão feita com sucesso");
        return conexao;
    } catch (ClassNotFoundException | SQLException e) {
        // Erro caso o driver JDBC não foi instalado
        e.printStackTrace();
        return null;
    }
  }

}
