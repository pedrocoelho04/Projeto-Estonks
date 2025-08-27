package com.estonks.projeto.controller;

import com.estonks.projeto.schemas.Usuario;
import com.estonks.projeto.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired // A anotação é opcional se houver apenas um construtor
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
     * Rota para buscar todos os usuários.
     * Mapeia para: GET /api/usuarios
     */
    @GetMapping
    public List<Usuario> listarTodos() {
        // Chamando o método do serviço injetado
        return usuarioService.listarTodosUsuarios();
    }

    /**
     * Rota para criar um novo usuário.
     * Mapeia para: POST /api/usuarios
     */
    @PostMapping
    public Usuario criarNovoUsuario(@RequestBody Usuario novoUsuario) {
        // Chamando o método do serviço injetado
        return usuarioService.salvarUsuario(novoUsuario);
    }
}