package com.estonks.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estonks.projeto.schemas.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository <Categoria, Long>{
  
}
