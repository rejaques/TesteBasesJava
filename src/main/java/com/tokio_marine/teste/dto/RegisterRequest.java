package com.tokio_marine.teste.dto;

import com.tokio_marine.teste.model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String nome;
    private String email;
    private String senha;

    // Recebe como string normal (USER/ADMIN) e converte
    public Role getRole() {
        return "ADMIN".equalsIgnoreCase(this.role) ? Role.ROLE_ADMIN : Role.ROLE_USER;
    }

    private String role;
}
