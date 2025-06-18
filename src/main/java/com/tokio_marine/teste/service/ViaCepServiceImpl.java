package com.tokio_marine.teste.service;

import com.tokio_marine.teste.dto.ViaCepResponse;
import com.tokio_marine.teste.exception.RegraNegocioException;
import com.tokio_marine.teste.service.interfaces.ViaCepService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ViaCepServiceImpl implements ViaCepService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String VIA_CEP_URL = "https://viacep.com.br/ws/{cep}/json/";

    @Override
    public ViaCepResponse consultarCep(String cep) {
        ResponseEntity<ViaCepResponse> response = restTemplate.getForEntity(VIA_CEP_URL, ViaCepResponse.class, cep);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            ViaCepResponse body = response.getBody();
            if (body.getErro() != null) {
                throw new RegraNegocioException("CEP inválido ou não encontrado.");
            }
            return body;
        }
        throw new RegraNegocioException("Erro ao consultar CEP.");
    }
}
