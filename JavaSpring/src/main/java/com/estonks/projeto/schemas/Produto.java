package com.estonks.projeto.schemas;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "produto", schema = "estonks")
public class Produto{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "nome", length = 255, nullable = false)
  private String nome;

  @Column(name = "digital", nullable = true)
  private Boolean digital;
  
  @Column(name = "altura", nullable = true)
  private Double altura;

  @Column(name = "largura", nullable = true)
  private Double largura;

  @Column(name = "peso", nullable = true)
  private Double peso;

  @Column(name = "quantidade", nullable = false)
  private Integer quantidade;

  @Column(name = "valor_unitario", nullable = false)
  private Double valor_Unitario;

  @Column(name = "comprimento", nullable = true)
  private Double comprimento;

  @Column(name = "data_criacao", nullable = false)
  private LocalDateTime data_criacao;

  @Column(name = "data_modificacao", nullable = true)
  private LocalDateTime data_modificacao;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "usuario_criou_id", nullable = true)
  private Usuario usuario_Criou_Id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "usuario_modificou_id", nullable = true)
  private Usuario usuario_Modificou_id;

  @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
  @JoinTable(
    name = "catxprod",
    joinColumns = @JoinColumn(name = "id_produto"),
    inverseJoinColumns = @JoinColumn(name = "id_categoria")
  )
  private Set<Categoria> categorias = new HashSet<>();

  public Produto(Integer id, String nome, Boolean digital, Double altura, Double largura, Double peso,
      Integer quantidade, Double valor_Unitario, Double comprimento, LocalDateTime data_criacao,
      LocalDateTime data_modificacao, Usuario usuario_Criou_Id, Usuario usuario_Modificou_id,
      Set<Categoria> categorias) {
    this.id = id;
    this.nome = nome;
    this.digital = digital;
    this.altura = altura;
    this.largura = largura;
    this.peso = peso;
    this.quantidade = quantidade;
    this.valor_Unitario = valor_Unitario;
    this.comprimento = comprimento;
    this.data_criacao = data_criacao;
    this.data_modificacao = data_modificacao;
    this.usuario_Criou_Id = usuario_Criou_Id;
    this.usuario_Modificou_id = usuario_Modificou_id;
    this.categorias = categorias;
  }

  public Produto() {
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

  public Boolean getDigital() {
    return digital;
  }

  public void setDigital(Boolean digital) {
    this.digital = digital;
  }

  public Double getAltura() {
    return altura;
  }

  public void setAltura(Double altura) {
    this.altura = altura;
  }

  public Double getLargura() {
    return largura;
  }

  public void setLargura(Double largura) {
    this.largura = largura;
  }

  public Double getPeso() {
    return peso;
  }

  public void setPeso(Double peso) {
    this.peso = peso;
  }

  public Integer getQuantidade() {
    return quantidade;
  }

  public void setQuantidade(Integer quantidade) {
    this.quantidade = quantidade;
  }

  public Double getValor_Unitario() {
    return valor_Unitario;
  }

  public void setValor_Unitario(Double valor_Unitario) {
    this.valor_Unitario = valor_Unitario;
  }

  public Double getComprimento() {
    return comprimento;
  }

  public void setComprimento(Double comprimento) {
    this.comprimento = comprimento;
  }

  public LocalDateTime getData_criacao() {
    return data_criacao;
  }

  public void setData_criacao(LocalDateTime data_criacao) {
    this.data_criacao = data_criacao;
  }

  public LocalDateTime getData_modificacao() {
    return data_modificacao;
  }

  public void setData_modificacao(LocalDateTime data_modificacao) {
    this.data_modificacao = data_modificacao;
  }

  public Usuario getUsuario_Criou_Id() {
    return usuario_Criou_Id;
  }

  public void setUsuario_Criou_Id(Usuario usuario_Criou_Id) {
    this.usuario_Criou_Id = usuario_Criou_Id;
  }

  public Usuario getUsuario_Modificou_id() {
    return usuario_Modificou_id;
  }

  public void setUsuario_Modificou_id(Usuario usuario_Modificou_id) {
    this.usuario_Modificou_id = usuario_Modificou_id;
  }

  public Set<Categoria> getCategorias() {
    return categorias;
  }

  public void setCategorias(Set<Categoria> categorias) {
    this.categorias = categorias;
  }
}