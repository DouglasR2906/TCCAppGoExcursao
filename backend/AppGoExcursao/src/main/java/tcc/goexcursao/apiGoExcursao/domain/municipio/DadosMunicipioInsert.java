package tcc.goexcursao.apiGoExcursao.domain.municipio;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record DadosMunicipioInsert(
        @NotBlank
        String sigla,
        @NotBlank
        String nome,
        List<String> cidades
) {
}


