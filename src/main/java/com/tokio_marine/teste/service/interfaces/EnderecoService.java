package com.tokio_marine.teste.service.interfaces;

import com.tokio_marine.teste.model.Endereco;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EnderecoService {

    Endereco salvarEndereco(Endereco endereco, Long usuarioId);
    List<Endereco> listarPorUsuario(Long usuarioId);
    Endereco atualizarEndereco(Long id, Endereco novoEndereco);
    void deletarEndereco(Long id);
}
