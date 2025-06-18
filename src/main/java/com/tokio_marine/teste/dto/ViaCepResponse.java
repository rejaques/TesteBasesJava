package com.tokio_marine.teste.dto;

import lombok.Data;

@Data
public class ViaCepResponse {
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade; // cidade
    private String uf;         // estado
    private String erro;       // se o cep não existir
}
