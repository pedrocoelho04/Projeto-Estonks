package com.estonks.projeto.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.estonks.projeto.repository.UsuariosRepository;
import com.estonks.projeto.response.CheckList;
import com.estonks.projeto.schemas.Usuario;
import com.estonks.projeto.service.UsuarioService;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class APIController {
  @GetMapping("/api/check")
  public String check() {
    return HttpStatus.OK.toString();
  }

  @PostMapping("/api/test")
  public String postIntenst(@RequestBody String requestBody, HttpServletResponse response) {
    StringBuilder strb= new StringBuilder();
    strb.append(HttpStatus.OK);
    strb.append(", " +requestBody);
    return strb.toString();
  }

}