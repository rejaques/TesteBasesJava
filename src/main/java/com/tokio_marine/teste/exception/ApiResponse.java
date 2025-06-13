package com.tokio_marine.teste.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiResponse {
    private boolean sucesso;
    private String mensagem;
    private Object dados;
}
