package com.tokio_marine.teste.service.interfaces;

import com.tokio_marine.teste.dto.ViaCepResponse;
import org.springframework.stereotype.Service;

@Service
public interface ViaCepService {

    ViaCepResponse consultarCep(String cep);
}
