package com.tokio_marine.teste.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@NoArgsConstructor
public class PaginacaoResponse <T>{

    private List<T> conteudo;
    private int pagina;
    private int tamanho;
    private long totalElementos;
    private boolean ultimaPagina;

    public PaginacaoResponse(List<T> conteudo, int pagina, int tamanho, long totalElementos, boolean ultimaPagina) {
        this.conteudo = conteudo;
        this.pagina = pagina;
        this.tamanho = tamanho;
        this.totalElementos = totalElementos;
        this.ultimaPagina = ultimaPagina;
    }
}
