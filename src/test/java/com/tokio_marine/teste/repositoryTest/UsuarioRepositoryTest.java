package com.tokio_marine.teste.repositoryTest;

import com.tokio_marine.teste.model.Usuario;
import com.tokio_marine.teste.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    void deveSalvarEBuscarPorEmail() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setNome("Renan");
        usuario.setEmail("teste@email.com");
        usuario.setSenha("123456");

        usuarioRepository.save(usuario);

        // Act
        Optional<Usuario> resultado = usuarioRepository.findByEmail("teste@email.com");

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("Renan", resultado.get().getNome());
    }
}
