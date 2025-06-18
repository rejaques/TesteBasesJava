package com.tokio_marine.teste.serviceTest;

import com.tokio_marine.teste.config.JwtService;
import com.tokio_marine.teste.dto.AuthResponse;
import com.tokio_marine.teste.dto.RegisterRequest;
import com.tokio_marine.teste.model.Usuario;
import com.tokio_marine.teste.repository.UsuarioRepository;
import com.tokio_marine.teste.service.AuthService;
import net.bytebuddy.utility.dispatcher.JavaDispatcher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Testcontainers
@SpringBootTest
@ActiveProfiles("test")
class AuthServiceTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("spring_api")
            .withUsername("postgres")
            .withPassword("123");

    @DynamicPropertySource
    static void setDatasourceProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }


    @InjectMocks
    private AuthService authService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveRegistrarUsuarioComSucesso() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setNome("Renan");
        request.setEmail("renan@email.com");
        request.setSenha("123456");

        when(passwordEncoder.encode(anyString())).thenReturn("senhaEncriptada");
        when(jwtService.generateToken(any(Usuario.class))).thenReturn("token-gerado");

        // Act
        AuthResponse response = authService.register(request);

        // Assert
        assertNotNull(response);
        assertEquals("token-gerado", response.getToken());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }
}
