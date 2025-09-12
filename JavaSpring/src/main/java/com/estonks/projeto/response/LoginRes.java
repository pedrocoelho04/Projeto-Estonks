package com.estonks.projeto.response;

public class LoginRes {
  private String message;
  private Integer status;
  private String token;
  public LoginRes(String message, Integer status, String token) {
    this.message = message;
    this.status = status;
    this.token = token;
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
}