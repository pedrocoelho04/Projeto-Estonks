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

    
  /**
   * Salva os dados de um usuario existente ou um novo usuario.
   * <p>
   * Este metodo pode realizar duas operações dependendo se o ID
   * do usuario for informado. Caso ele não seja enviado ele salvará
   * um novo usuario, caso contrario, ele salvará todos os dados no
   * usuario de ID informado.
   * </p>
   * @param usuario um usuario existente ou um usuario novo.
   * @return retorna o usuario salvo.
   */
    public Usuario salvarUsuario(Usuario usuario) {
        return usuariosRepository.save(usuario);
    }

    /**
   * Lista todos os usuarios existentes.
   * <p>
   * Este metodo realiza a consulta da base de dados de todos os
   * usuarios existentes na base de dados e retorna uma array de
   * Objetos usuarios
   * </p>
   * @return uma lista de Objetos usuarios.
   */
    public List<Usuario> listarTodosUsuarios() {
        return usuariosRepository.findAll();
    }

    /**
   * Busca um usuario existente.
   * <p>
   * Este metodo realizar a busca do usuario pelo seu respectivo ID
   * e retornar o usuario encontrado na base de dados.
   * </p>
   * @param id o ID do usuario do qual será consultado.
   * @return o usuario consultado na base.
   */
    public Optional<Usuario> buscarUsuarioPorId(Long id) {
        return usuariosRepository.findById(id);
    }

  /**
   * Busca um nome e senha de um usuario.
   * <p>
   * Este metodo realizar a busca do usuario pelo seu nome e senha
   * para retorna-los
   * </p>
   * @param usuario o nome do usuario do qual será consultado.
   * @param senha a senha do usuario do qual será consultado.
   * @return se o usuario está na base conforme informado.
   */
    public Optional<Usuario> buscarLoginUsuario(String usuario, String senha) {
        return usuariosRepository.findByNomeAndSenha(usuario, senha);
    }

    /**
   * Deleta um usuario existente.
   * <p>
   * Este método realiza a exclusão de um usuario pelo seu respectivo ID.
   * </p>
   * @param id o ID do usuario do qual será excluido.
   */
    public void deletarUsuario(Long id) {
        usuariosRepository.deleteById(id);
    }
  
}
