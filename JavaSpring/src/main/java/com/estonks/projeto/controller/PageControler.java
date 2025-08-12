package com.estonks.projeto.controller;

import java.io.BufferedReader;
import java.io.FileReader;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.estonks.projeto.Database.DatabaseConnection;

@Controller
public class PageControler {
  @GetMapping("/")
  public String index() {
    return "./index.html";
  }
  //   @GetMapping("/test")
  // public String test() {
  //   BufferedReader leitor = new BufferedReader(new FileReader("../../../../../resources/static/index.html"));
  //   return leitor.read();
  // }

  @GetMapping("/test")
  public void test(){
    DatabaseConnection data = new DatabaseConnection();
    data.connect();
  }
}
