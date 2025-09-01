package com.estonks.projeto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.estonks.projeto.repository.CategoriaRepository;
import com.estonks.projeto.repository.ProdutoRepository;
import com.estonks.projeto.schemas.Categoria;
import com.estonks.projeto.schemas.Produto;

@Service
public class ProdutoService {
  private final ProdutoRepository produtoRepository;
  private final CategoriaRepository categoriaRepository;

  @Autowired
  public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository) {
    this.produtoRepository = produtoRepository;
    this.categoriaRepository = categoriaRepository;
  }

 /**
   * Salva os dados de um produto existente ou um novo produto.
   * <p>
   * Este metodo pode realizar duas operações dependendo se o ID
   * do produto for informado. Caso ele não seja enviado ele salvará
   * um novo produto, caso contrario, ele salvará todos os dados no
   * produto de ID informado.
   * </p>
   * @param produto um produto existente ou um produto novo.
   * @return retorna o produto salvo.
   */
  public Produto salvarProduto(Produto produto) {
    return produtoRepository.save(produto);
  }

  /**
   * Lista todos os produtos existentes.
   * <p>
   * Este metodo realiza a consulta da base de dados de todos os
   * produtos existentes na base de dados e retorna uma array de
   * Objetos produtos
   * </p>
 * @return uma lista de Objetos produtos.
 */
  public List<Produto> listarTodosProdutos() {
    return produtoRepository.findAll();
  }

  /**
   * Busca um produto existente.
   * <p>
   * Este metodo realizar a busca do produto pelo seu respectivo ID
   * e retornar o produto encontrado na base de dados.
   * </p>
 * @param id o ID do produto do qual será consultado.
 * @return o produto consultado na base.
 */
  public Optional<Produto> buscarProdutoPorId(Long id) {
    return produtoRepository.findById(id);
  }

  /**
   * Deleta um produto existente.
   * <p>
   * Este método realiza a exclusão de um produto pelo seu respectivo ID.
   * </p>
 * @param id o ID do produto do qual será excluido.
 */
public void deletarProduto(Long id) {
    produtoRepository.deleteById(id);
  }

/**
 * Adiciona uma categoria a um produto existente.
 * <p>
 * Este método busca o produto e a categoria pelos seus respectivos IDs,
 * adiciona a categoria à lista de categorias do produto e salva a alteração
 * no banco de dados.
 * </p>
 *
 * @param produtoId   o ID do produto ao qual a categoria será adicionada
 * @param categoriaId o ID da categoria a ser adicionada ao produto
 * @return o produto atualizado com a nova categoria associada
 * @throws RuntimeException se o produto ou a categoria não forem encontrados
 */
  @Transactional
  public Produto adicionarCategoriaAoProduto(Long produtoId, Long categoriaId) {
    Produto produto = produtoRepository.findById(produtoId)
        .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

    Categoria categoria = categoriaRepository.findById(categoriaId)
        .orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));

    produto.getCategorias().add(categoria);

    return produtoRepository.save(produto);
  }
}