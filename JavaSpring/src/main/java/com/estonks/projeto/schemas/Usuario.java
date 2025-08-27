package com.estonks.projeto.schemas;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Integer id;

  @Column(name = "nome", length = 255, nullable = false)
  String nome;

  @Column(name = "senha", length = 255, nullable = false)
  String senha;

  @OneToMany(mappedBy = "usuario_Criou_Id", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  private List<Produto> produtosCriados = new ArrayList<>();

  @OneToMany(mappedBy = "usuario_Modificou_id", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  private List<Produto> produtosAlterados = new ArrayList<>();

  public Usuario(Integer id, String nome, String senha, List<Produto> produtosCriados,
      List<Produto> produtosAlterados) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
    this.produtosCriados = produtosCriados;
    this.produtosAlterados = produtosAlterados;
  }

  public Usuario() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
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
}
