package com.estonks.projeto.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estonks.projeto.schemas.Usuario;

@Repository
public interface UsuariosRepository extends JpaRepository <Usuario, Long>{
  Optional<Usuario> findByNomeAndSenha(String nome, String senha);
}
