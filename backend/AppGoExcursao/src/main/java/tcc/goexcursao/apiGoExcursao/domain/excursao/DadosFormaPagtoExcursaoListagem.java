package tcc.goexcursao.apiGoExcursao.domain.excursao;

import tcc.goexcursao.apiGoExcursao.domain.excursao.Excursao;
import tcc.goexcursao.apiGoExcursao.domain.formaPagamento.FormaPagamento;

public record DadosFormaPagtoExcursaoListagem(
        Long idExcursao,
        Long idFormaPagto,
        String tituloExcursao,
        String descricaoFormaPagamento
) {
        public DadosFormaPagtoExcursaoListagem(Excursao excursao, FormaPagamento formaPagamento){
                this(excursao.getIdExcursao(), formaPagamento.getIdFormaPagamento(), excursao.getTituloExcursao(), formaPagamento.getDescricaoFormaPagamento());
        }
}
