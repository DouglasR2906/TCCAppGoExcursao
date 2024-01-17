package tcc.goexcursao.apiGoExcursao.domain.municipio;

import jakarta.validation.constraints.NotNull;

public record DadosMunicipioAtualizar(
        @NotNull
        Long idMunicipio,
        String nomeMunicipio,
        String ufMunicipio
) {
}
