package com.tokio_marine.teste.controller;

import com.tokio_marine.teste.config.JwtService;
import com.tokio_marine.teste.dto.PaginacaoResponse;
import com.tokio_marine.teste.dto.UsuarioDTO;
import com.tokio_marine.teste.model.Usuario;
import com.tokio_marine.teste.service.interfaces.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final JwtService jwtService;


    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> listarTodos(
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamanho)
    {
        int paginaConvertida = (pagina > 0) ? pagina - 1 : 0;

        Pageable pageable = PageRequest.of(paginaConvertida, tamanho);

        Page<Usuario> usuarios = usuarioService.listarTodos(pageable);

        PaginacaoResponse<Usuario> resposta = new PaginacaoResponse<>(
                usuarios.getContent(),
                usuarios.getNumber() + 1, // começa em 1
                usuarios.getSize(),
                usuarios.getTotalElements(),
                usuarios.isLast()
        );

        return ResponseEntity.ok(resposta);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id, Authentication authentication) {
        Usuario usuario = usuarioService.buscarPorIdRestrito(id, authentication);
        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<Map<String, Object>> atualizar(@PathVariable Long id, @Valid @RequestBody UsuarioDTO dto, Authentication auth) {
        Usuario atualizado = usuarioService.atualizarRestrito(id, dto, auth);
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("mensagem", "Usuário atualizado com sucesso");
        resposta.put("usuario", atualizado);
        return ResponseEntity.ok(resposta);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, String>> deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
        Map<String, String> resposta = new HashMap<>();
        resposta.put("mensagem", "Usuário deletado com sucesso");
        return ResponseEntity.ok(resposta);
    }

}
