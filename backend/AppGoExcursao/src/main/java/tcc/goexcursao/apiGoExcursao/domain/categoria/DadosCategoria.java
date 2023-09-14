package tcc.goexcursao.apiGoExcursao.domain.categoria;

import jakarta.validation.constraints.NotBlank;

public record DadosCategoria(
        @NotBlank
        String descricaoCategoria
) {
}
