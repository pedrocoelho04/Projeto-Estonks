package com.estonks.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estonks.projeto.schemas.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long>{
  //Pode adicionar Querys extras aqui:    
  
  // JPA vai entender e criar: "SELECT p FROM Produto p WHERE p.nome = ?"
  //List<Produto> findByNome(String nome);

    // "SELECT p FROM Produto p WHERE p.preco > ?"
  //List<Produto> findByPrecoGreaterThan(double preco);

    // "SELECT p FROM Produto p WHERE p.nome LIKE ?"
  //List<Produto> findByNomeContainingIgnoreCase(String termo);
    
    // "SELECT p FROM Produto p WHERE p.nome = ? AND p.preco < ?"
  //List<Produto> findByNomeAndPrecoLessThan(String nome, double preco);
}
