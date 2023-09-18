package tcc.goexcursao.apiGoExcursao.domain.formaPagamento;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosFormaPagamentoListagem(
        Long idFormaPagamento,
        String descricaoFormaPagamento
) {
    public DadosFormaPagamentoListagem(FormaPagamento formaPagamento){
        this(formaPagamento.getIdFormaPagamento(), formaPagamento.getDescricaoFormaPagamento());
    }
}
