package com.estonks.projeto.service;

import com.estonks.projeto.repository.UsuariosRepository;
import com.estonks.projeto.schemas.Usuario;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class UsuarioServiceTest {
	@Autowired
	private UsuarioService usuarioService;

	@MockBean
	private UsuariosRepository usuariosRepository;

	@Test
	public void listarTodosUsuarios() {
		List<Usuario> expected = new ArrayList<>();
		List<Usuario> actual = usuarioService.listarTodosUsuarios();

		assertEquals(expected, actual);
	}
}
