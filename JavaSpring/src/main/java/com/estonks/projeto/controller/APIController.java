package com.estonks.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.estonks.projeto.request.LoginReq;
import com.estonks.projeto.response.LoginRes;
import com.estonks.projeto.service.UsuarioService;

import java.util.UUID;

@RestController
public class APIController {
  private final UsuarioService userDB;

  @Autowired
  public APIController(UsuarioService userDB) {
    this.userDB = userDB;
  }

  @PostMapping("/api/login")
  public ResponseEntity<LoginRes> login(@RequestBody LoginReq requestBody) {
    String user = requestBody.getUser();
    String password = requestBody.getPassword();

    if (user == null || password == null || user.isEmpty() || password.isEmpty()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LoginRes("Falha ao validar, houve dados pendentes.", HttpStatus.BAD_REQUEST.value()));

    String token = UUID.randomUUID().toString();

    if (!userDB.buscarLoginUsuario(user, password).isEmpty()) return ResponseEntity.status(HttpStatus.OK).body(new LoginRes("Login de usuário aprovado", HttpStatus.OK.value(), token));

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginRes("Login incorreto.", HttpStatus.UNAUTHORIZED.value()));
  }

}