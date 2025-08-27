package com.estonks.projeto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estonks.projeto.repository.UsuariosRepository;
import com.estonks.projeto.schemas.Usuario;

@Service
public class UsuarioService {
  private final UsuariosRepository usuariosRepository;

  @Autowired
  public UsuarioService(UsuariosRepository usuariosRepository) {
        this.usuariosRepository = usuariosRepository;
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return usuariosRepository.save(usuario);
    }

    public List<Usuario> listarTodosUsuarios() {
        return usuariosRepository.findAll();
    }

    public Optional<Usuario> buscarUsuarioPorId(Long id) {
        return usuariosRepository.findById(id);
    }

    public void deletarUsuario(Long id) {
        usuariosRepository.deleteById(id);
    }
  
}
