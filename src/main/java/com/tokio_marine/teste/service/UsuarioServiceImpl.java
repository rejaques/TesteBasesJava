package com.tokio_marine.teste.service;

import com.tokio_marine.teste.dto.UsuarioDTO;
import com.tokio_marine.teste.exception.RecursoNaoEncontradoException;
import com.tokio_marine.teste.exception.RegraNegocioException;
import com.tokio_marine.teste.model.Usuario;
import com.tokio_marine.teste.repository.UsuarioRepository;
import com.tokio_marine.teste.service.interfaces.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;



    @Override
    public Usuario criar(UsuarioDTO dto) {
        try {
            Usuario usuario = new Usuario();
            usuario.setNome(dto.getNome());
            usuario.setEmail(dto.getEmail());
            usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
            usuario.setRole(dto.getRole());
            return usuarioRepository.save(usuario);
        } catch (Exception e) {
            throw new RegraNegocioException("Erro ao criar usuário: " + e.getMessage());
        }
    }

    @Override
    public Page<Usuario> listarTodos(Pageable pageable) {
        try {
            return usuarioRepository.findAll(pageable);
        } catch (Exception e) {
            throw new RegraNegocioException("Erro ao buscar usuários paginados.");
        }
    }

    @Override
    public Usuario buscarPorIdRestrito(Long id, Authentication auth) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));

        if (!ehAdmin(auth) && !usuario.getEmail().equals(getEmailUsuario(auth))) {
            throw new AccessDeniedException("Acesso negado");
        }

        return usuario;
    }

    @Override
    public Usuario atualizarRestrito(Long id, UsuarioDTO dto, Authentication auth) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));

        if (!ehAdmin(auth) && !usuario.getEmail().equals(getEmailUsuario(auth))) {
            throw new AccessDeniedException("Acesso negado");
        }

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
        }
        usuario.setRole(dto.getRole());

        return usuarioRepository.save(usuario);
    }

    @Override
    public void deletar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RecursoNaoEncontradoException("Usuário com ID " + id + " não encontrado.");
        }
        usuarioRepository.deleteById(id);
    }

    private boolean ehAdmin(Authentication auth) {
        return auth.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
    }

    private String getEmailUsuario(Authentication auth) {
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }
}
