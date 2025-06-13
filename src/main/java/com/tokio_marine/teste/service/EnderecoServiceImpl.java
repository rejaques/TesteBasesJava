package com.tokio_marine.teste.service;

import com.tokio_marine.teste.exception.RecursoNaoEncontradoException;
import com.tokio_marine.teste.exception.RegraNegocioException;
import com.tokio_marine.teste.model.Endereco;
import com.tokio_marine.teste.model.Usuario;
import com.tokio_marine.teste.repository.EnderecoRepository;
import com.tokio_marine.teste.repository.UsuarioRepository;
import com.tokio_marine.teste.service.interfaces.EnderecoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class EnderecoServiceImpl implements EnderecoService {

    private final EnderecoRepository enderecoRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public Endereco salvarEndereco(Endereco endereco, Long usuarioId) {
        try {
            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));

            endereco.setUsuario(usuario);
            return enderecoRepository.save(endereco);
        } catch (Exception e) {
            throw new RegraNegocioException("Erro ao salvar endereço: " + e.getMessage());
        }
    }

    @Override
    public List<Endereco> listarPorUsuario(Long usuarioId) {
        try {
            return enderecoRepository.findByUsuarioId(usuarioId);
        } catch (Exception e) {
            throw new RegraNegocioException("Erro ao listar endereços do usuário");
        }
    }

    @Override
    public Endereco atualizarEndereco(Long id, Endereco novoEndereco) {
        try {
            Endereco existente = enderecoRepository.findById(id)
                    .orElseThrow(() -> new RecursoNaoEncontradoException("Endereço não encontrado"));

            existente.setLogradouro(novoEndereco.getLogradouro());
            existente.setNumero(novoEndereco.getNumero());
            existente.setComplemento(novoEndereco.getComplemento());
            existente.setBairro(novoEndereco.getBairro());
            existente.setCidade(novoEndereco.getCidade());
            existente.setEstado(novoEndereco.getEstado());
            existente.setCep(novoEndereco.getCep());

            return enderecoRepository.save(existente);
        } catch (Exception e) {
            throw new RegraNegocioException("Erro ao atualizar endereço: " + e.getMessage());
        }
    }

    @Override
    public void deletarEndereco(Long id) {
        try {
            if (!enderecoRepository.existsById(id)) {
                throw new RecursoNaoEncontradoException("Endereço não encontrado para exclusão");
            }
            enderecoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RegraNegocioException("Erro ao deletar endereço");
        }
    }
}
