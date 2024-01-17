package tcc.goexcursao.apiGoExcursao.domain.municipio;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record DadosMunicipio(
        @NotBlank
        String nomeMunicipio,
        @NotBlank
        String ufMunicipio
) {
}