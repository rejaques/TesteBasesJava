package com.tokio_marine.teste.controller;

import com.tokio_marine.teste.model.Endereco;
import com.tokio_marine.teste.service.interfaces.EnderecoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enderecos")
@RequiredArgsConstructor
public class EnderecoController {

    private final EnderecoService enderecoService;

    @PostMapping("/{usuarioId}")
    public ResponseEntity<Endereco> criar(
            @PathVariable Long usuarioId,
            @Valid @RequestBody Endereco endereco) {
        Endereco salvo = enderecoService.salvarEndereco(endereco, usuarioId);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping("/usuario/{usuarioId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Endereco>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(enderecoService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Endereco> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Endereco endereco) {
        Endereco atualizado = enderecoService.atualizarEndereco(id, endereco);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        enderecoService.deletarEndereco(id);
        return ResponseEntity.noContent().build();
    }
}
