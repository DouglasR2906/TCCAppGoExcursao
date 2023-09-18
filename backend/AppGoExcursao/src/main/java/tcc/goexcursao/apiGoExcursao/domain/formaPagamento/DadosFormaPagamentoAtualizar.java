package tcc.goexcursao.apiGoExcursao.domain.formaPagamento;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosFormaPagamentoAtualizar(
        @NotNull
        Long idFormaPagamento,

        @NotBlank
        String descricaoFormaPagamento
) {
}
