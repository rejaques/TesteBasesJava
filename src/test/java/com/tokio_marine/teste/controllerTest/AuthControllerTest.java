package com.tokio_marine.teste.controllerTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tokio_marine.teste.config.JwtService;
import com.tokio_marine.teste.controller.AuthController;
import com.tokio_marine.teste.dto.RegisterRequest;
import com.tokio_marine.teste.repository.UsuarioRepository;
import com.tokio_marine.teste.service.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private AuthService authService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Test
    void deveRegistrarUsuario() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setNome("Renan");
        request.setEmail("renan@email.com");
        request.setSenha("123456");

        when(authService.register(any())).thenReturn(new com.tokio_marine.teste.dto.AuthResponse("token-fake"));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token-fake"));
    }
}
