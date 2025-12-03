package com.estonks.projeto.schemas;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nome", length = 255, nullable = false)
  private String nome;

  @Column(name = "senha", length = 255, nullable = false)
  private String senha;

  @Column(name = "permissao", length = 255, nullable = true)
  private String permissao;

  @Column(name = "token", length = 36, nullable = true)
  private String token;

  @com.fasterxml.jackson.annotation.JsonIgnore
  @OneToMany(mappedBy = "usuario_Criou_Id", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  private List<Produto> produtosCriados = new ArrayList<>();

  @com.fasterxml.jackson.annotation.JsonIgnore
  @OneToMany(mappedBy = "usuario_Modificou_id", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  private List<Produto> produtosAlterados = new ArrayList<>();

  public Usuario(Long id, String nome, String senha, String permissao, String token) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
    this.permissao = permissao;
    this.token = token;
  }

  public Usuario(Long id, String nome, String senha, String permissao, List<Produto> produtosCriados,
      List<Produto> produtosAlterados, String token) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
    this.permissao = permissao;
    this.token = token;
    this.produtosCriados = produtosCriados;
    this.produtosAlterados = produtosAlterados;
  }

  public Usuario() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  public List<Produto> getProdutosCriados() {
    return produtosCriados;
  }

  public void setProdutosCriados(List<Produto> produtosCriados) {
    this.produtosCriados = produtosCriados;
  }

  public List<Produto> getProdutosAlterados() {
    return produtosAlterados;
  }

  public void setProdutosAlterados(List<Produto> produtosAlterados) {
    this.produtosAlterados = produtosAlterados;
  }

  public String getPermissao() {
    return permissao;
  }

  public void setPermissao(String permissao) {
    this.permissao = permissao;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
