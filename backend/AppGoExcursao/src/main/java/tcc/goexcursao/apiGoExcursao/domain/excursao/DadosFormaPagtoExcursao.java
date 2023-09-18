package tcc.goexcursao.apiGoExcursao.domain.excursao;

import jakarta.validation.constraints.NotNull;

public record DadosFormaPagtoExcursao(
        @NotNull
        Long idExcursao,
        @NotNull
        Long idFormaPagto
) {
}
