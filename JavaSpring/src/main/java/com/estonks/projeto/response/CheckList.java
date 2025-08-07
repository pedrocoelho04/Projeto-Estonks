package com.estonks.projeto.response;

public class CheckList {
  private Integer id;
  private String name;
  private int qtd;

  public CheckList(Integer id, String name, int qtd) {
    this.id = id;
    this.name = name;
    this.qtd = qtd;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getQtd() {
    return qtd;
  }

  public void setQtd(int qtd) {
    this.qtd = qtd;
  }
}
