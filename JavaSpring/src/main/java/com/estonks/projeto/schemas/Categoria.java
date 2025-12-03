package com.estonks.projeto.schemas;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "categoria")
public class Categoria {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nome", length = 100, nullable = false)
  private String nome;

  @com.fasterxml.jackson.annotation.JsonIgnore
  @ManyToMany(mappedBy = "categorias")
  private Set<Produto> produtos = new HashSet<>();

  public Categoria(Long id, String nome, Set<Produto> produtos) {
    this.id = id;
    this.nome = nome;
    this.produtos = produtos;
  }

  public Categoria() {
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

  public Set<Produto> getProdutos() {
    return produtos;
  }

  public void setProdutos(Set<Produto> produtos) {
    this.produtos = produtos;
  }
}
