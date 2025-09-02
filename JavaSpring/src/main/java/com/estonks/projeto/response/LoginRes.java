package com.estonks.projeto.response;

public class LoginRes {
  private String message;
  private Integer status;
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
}