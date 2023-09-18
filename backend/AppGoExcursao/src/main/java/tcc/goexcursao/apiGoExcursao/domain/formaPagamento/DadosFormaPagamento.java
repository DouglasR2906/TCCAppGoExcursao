package tcc.goexcursao.apiGoExcursao.domain.formaPagamento;

import jakarta.validation.constraints.NotBlank;

public record DadosFormaPagamento(
        @NotBlank
        String descricaoFormaPagamento
) {
}
