package com.tokio_marine.teste.service.interfaces;

import com.tokio_marine.teste.dto.UsuarioDTO;
import com.tokio_marine.teste.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UsuarioService {

    public Page<Usuario> listarTodos(Pageable peageble);

    public Usuario buscarPorIdRestrito(Long id, Authentication authentication);

    public Usuario criar(UsuarioDTO dto);

    public Usuario atualizarRestrito(Long id, UsuarioDTO dto, Authentication auth);

    public void deletar(Long id);
}
