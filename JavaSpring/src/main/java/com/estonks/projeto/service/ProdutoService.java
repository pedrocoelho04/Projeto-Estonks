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

    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodosProdutos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public void deletarProduto(Long id) {
        produtoRepository.deleteById(id);
    }

     
    @Transactional
    public Produto adicionarCategoriaAoProduto(Long produtoId, Long categoriaId) {
        // 1. Buscar o produto e a categoria do banco
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));

        // 2. Adicionar a categoria à coleção de categorias do produto
        produto.getCategorias().add(categoria);

        // 3. Salvar o produto.
        // Por causa do @Transactional, muitas vezes nem seria preciso chamar o save()
        // pois o Hibernate detecta a alteração (dirty checking). Mas chamar é mais
        // explícito.
        return produtoRepository.save(produto);
    }
}
