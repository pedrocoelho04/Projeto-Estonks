package com.estonks.projeto.response;

import com.estonks.projeto.schemas.Usuario;

public class LoginRes {
  private String message;
  private Integer status;
  private String token;
  private Usuario usuario;

  public LoginRes(String message, Integer status, String token, Usuario usuario) {
    this.message = message;
    this.status = status;
    this.token = token;
    this.usuario = usuario;
  }

  public LoginRes(String message, Integer status) {
    this.message = message;
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public Integer getStatus() {
    return status;
  }

  public String getToken() {
    return token;
  }

  public Usuario getUsuario() {
    return usuario;
  }
}