package com.estonks.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.estonks.projeto.request.LoginReq;
import com.estonks.projeto.response.LoginRes;
import com.estonks.projeto.schemas.Categoria;
import com.estonks.projeto.schemas.Produto;
import com.estonks.projeto.schemas.Usuario;

import com.estonks.projeto.service.UsuarioService;
import com.estonks.projeto.service.ProdutoService;
import com.estonks.projeto.service.CategoriaService;

import java.util.List;

import java.util.UUID;

@RestController
public class APIController {

  private final UsuarioService userDB;
  private final ProdutoService produtoService;
  private final CategoriaService categoriaService;

  @Autowired
  public APIController(UsuarioService userDB, ProdutoService produtoService, CategoriaService categoriaService) {
    this.userDB = userDB;
    this.produtoService = produtoService;
    this.categoriaService = categoriaService;
  }

  // ROTA DE LOGIN
  @PostMapping("/api/login")
  public ResponseEntity<LoginRes> login(@RequestBody LoginReq requestBody) {
    String user = requestBody.getUser();
    String password = requestBody.getPassword();

    if (user == null || password == null || user.isEmpty() || password.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new LoginRes("Falha ao validar, houve dados pendentes.", HttpStatus.BAD_REQUEST.value()));
    }

    String token = UUID.randomUUID().toString();

    java.util.Optional<com.estonks.projeto.schemas.Usuario> usuarioOpt = userDB.buscarLoginUsuario(user, password);
    if (usuarioOpt.isPresent()) {
      return ResponseEntity.status(HttpStatus.OK)
          .body(new LoginRes("Login de usuário aprovado", HttpStatus.OK.value(), token, usuarioOpt.get()));
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(new LoginRes("Login incorreto.", HttpStatus.UNAUTHORIZED.value()));
  }

  // ROTAS DE PRODUTOS

  @GetMapping("/api/produtos")
  public ResponseEntity<List<Produto>> listarProdutos() {
    List<Produto> produtos = produtoService.listarTodosProdutos();
    return ResponseEntity.ok(produtos);
  }

  @GetMapping("/api/produtos/{id}")
  public ResponseEntity<Produto> buscarProdutoPorId(@PathVariable Long id) {
    return produtoService.buscarProdutoPorId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/api/produtos")
  public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
    Produto novoProduto = produtoService.salvarProduto(produto);
    return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
  }

  @PutMapping("/api/produtos/{id}")
  public ResponseEntity<Produto> editarProduto(@PathVariable Long id, @RequestBody Produto produto) {
    return produtoService.buscarProdutoPorId(id)
        .map(existing -> {
          produto.setId(id);
          produto.setData_criacao(existing.getData_criacao());
          produto.setUsuario_Criou_Id(existing.getUsuario_Criou_Id());
          produto.setData_modificacao(java.time.LocalDateTime.now());
          Produto produtoAtualizado = produtoService.salvarProduto(produto);
          return ResponseEntity.ok(produtoAtualizado);
        })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/api/produtos/{id}")
  public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
    produtoService.deletarProduto(id);
    return ResponseEntity.noContent().build();
  }

  // ROTAS DE CATEGORIAS

  @GetMapping("/api/categorias")
  public ResponseEntity<List<Categoria>> listarCategorias() {
    return ResponseEntity.ok(categoriaService.listarTodosCategorias());
  }

  @GetMapping("/api/categorias/{id}")
  public ResponseEntity<Categoria> buscarCategoriaPorId(@PathVariable Long id) {
    return categoriaService.buscarCategoriaPorId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/api/categorias")
  public ResponseEntity<Categoria> criarCategoria(@RequestBody Categoria categoria) {
    return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.salvarCategoria(categoria));
  }

  @PutMapping("/api/categorias/{id}")
  public ResponseEntity<Categoria> editarCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
    categoria.setId(id);
    return ResponseEntity.ok(categoriaService.salvarCategoria(categoria));
  }

  @DeleteMapping("/api/categorias/{id}")
  public ResponseEntity<Void> deletarCategoria(@PathVariable Long id) {
    categoriaService.deletarCategoria(id);
    return ResponseEntity.noContent().build();
  }

  // ROTAS DE USUARIOS

  @GetMapping("/api/usuarios")
  public ResponseEntity<List<Usuario>> listarUsuarios() {
    return ResponseEntity.ok(userDB.listarTodosUsuarios());
  }

  @GetMapping("/api/usuarios/{id}")
  public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Long id) {
    return userDB.buscarUsuarioPorId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/api/usuarios")
  public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
    return ResponseEntity.status(HttpStatus.CREATED).body(userDB.salvarUsuario(usuario));
  }

  @PutMapping("/api/usuarios/{id}")
  public ResponseEntity<Usuario> editarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
    return userDB.buscarUsuarioPorId(id)
        .map(existing -> {
          usuario.setId(id);
          if (usuario.getSenha() == null || usuario.getSenha().isEmpty()) {
            usuario.setSenha(existing.getSenha());
          }
          // Preserve token if not sent
          if (usuario.getToken() == null) {
            usuario.setToken(existing.getToken());
          }
          return ResponseEntity.ok(userDB.salvarUsuario(usuario));
        })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/api/usuarios/{id}")
  public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
    userDB.deletarUsuario(id);
    return ResponseEntity.noContent().build();
  }
}