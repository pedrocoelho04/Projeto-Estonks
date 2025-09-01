package com.estonks.projeto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estonks.projeto.repository.CategoriaRepository;
import com.estonks.projeto.schemas.Categoria;

@Service
public class CategoriaService {
  private final CategoriaRepository categoriaRepository;

  @Autowired
  public CategoriaService(CategoriaRepository categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  /**
   * Salva os dados de um categoria existente ou um nova categoria.
   * <p>
   * Este metodo pode realizar duas operações dependendo se o ID
   * da categoria for informado. Caso ele não seja enviado ele salvará
   * uma nova categoria, caso contrario, ele salvará todos os dados na
   * categoria de ID informado.
   * </p>
   * @param categoria uma categoria existente ou uma categoria nova.
   * @return retorna a categoria salva.
   */
  public Categoria salvarCategoria(Categoria categoria) {
    return categoriaRepository.save(categoria);
  }

  /**
   * Lista todas as categorias existentes.
   * <p>
   * Este metodo realiza a consulta da base de dados de todas as
   * categorias existentes na base de dados e retorna uma array de
   * Objetos categorias
   * </p>
   * @return uma lista de Objetos categorias.
   */
  public List<Categoria> listarTodosCategorias() {
    return categoriaRepository.findAll();
  }

  /**
   * Busca uma categoria existente.
   * <p>
   * Este metodo realizar a busca da categoria pelo seu respectivo ID
   * e retornar a categoria encontrada na base de dados.
   * </p>
 * @param id o ID da categoria do qual será consultado.
 * @return a categoria consultado na base.
 */
  public Optional<Categoria> buscarCategoriaPorId(Long id) {
    return categoriaRepository.findById(id);
  }

  /**
   * Deleta uma categoria existente.
   * <p>
   * Este método realiza a exclusão da categoria pelo seu respectivo ID.
   * </p>
 * @param id o ID da categoria no qual será excluido.
 */
  public void deletarCategoria(Long id) {
    categoriaRepository.deleteById(id);
  }
}