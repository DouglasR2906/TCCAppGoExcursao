package tcc.goexcursao.apiGoExcursao.domain.formaPagamento;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import tcc.goexcursao.apiGoExcursao.domain.excursao.Excursao;

import java.util.Set;

@Entity(name = "FormaPagamento")
@Table(name = "forma_pagamento")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idFormaPagamento")
public class FormaPagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_forma_pagamento")
    private Long idFormaPagamento;

    @Column(name = "descricao_forma_pagamento")
    private String descricaoFormaPagamento;

    @ManyToMany(mappedBy = "formasPagamento")
    @Column(name = "id_forma_pagamento_formapagtoExcursao")
    private Set<Excursao> excursoes;

    public FormaPagamento(DadosFormaPagamento dadosFormaPagamento){
        this.descricaoFormaPagamento = dadosFormaPagamento.descricaoFormaPagamento();
    }

    public void atualizarFormaPagamento(DadosFormaPagamentoAtualizar dados){
        if(dados.descricaoFormaPagamento() != null){
            this.descricaoFormaPagamento = dados.descricaoFormaPagamento();
        }
    }
}