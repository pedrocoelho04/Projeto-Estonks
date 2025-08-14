package com.estonks.projeto.service;

import com.estonks.projeto.repository.ProdutoRepository;
import com.estonks.projeto.schemas.Produto;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class ProdutoServiceTest {
	@Autowired
	private ProdutoService produtoService;

	@MockBean
	private ProdutoRepository produtoRepository;

	@Test
	public void salvarProduto() {
		Produto produto = new Produto();
		Produto expected = new Produto();
		Produto actual = produtoService.salvarProduto(produto);

		assertEquals(expected, actual);
	}
}
