package com.estonks.projeto.controller;

import java.io.BufferedReader;
import java.io.FileReader;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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
}
