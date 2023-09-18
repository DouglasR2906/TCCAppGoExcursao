package tcc.goexcursao.apiGoExcursao.domain.excursao;

import jakarta.persistence.*;
import lombok.*;
import tcc.goexcursao.apiGoExcursao.domain.categoria.Categoria;
import tcc.goexcursao.apiGoExcursao.domain.formaPagamento.FormaPagamento;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Table(name = "excursao")
@Entity(name = "Excursao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idExcursao")
public class Excursao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_excursao")
    private Long idExcursao;
    @ManyToOne
    @JoinColumn(name = "id_usuario_excursao")
    private Usuario usuario;
    @Column(name = "titulo_excursao")
    private String tituloExcursao;
    @Column(name = "cidade_origem_excursao")
    private String cidadeOrigemExcursao;
    @Column(name = "cidade_destino_excursao")
    private String cidadeDestinoExcursao;
    @Column(name = "descricao_excursao")
    private String descricaoExcursao;
    @Column(name = "valor_excursao")
    private double valorExcursao;
    @Column(name = "data_ida_excursao")
    private LocalDate dataIdaExcursao;
    @Column(name = "data_volta_excursao")
    private LocalDate dataVoltaExcursao;
    @Column(name = "hora_ida_excursao")
    private LocalTime horaIdaExcursao;
    @Column(name = "hora_volta_excursao")
    private LocalTime horaVoltaExcursao;
    @ManyToOne
    @JoinColumn(name = "id_categoria_excursao")
    private Categoria categoria;
    @Column(name = "cancelada_excursao")
    private Boolean canceladaExcursao;

    @ManyToMany
    @JoinTable(
            name = "forma_pagto_excursao",
            joinColumns = @JoinColumn(name = "id_excursao_formapagtoexcursao"),
            inverseJoinColumns = @JoinColumn(name = "id_forma_pagamento_formapagtoexcursao")
    )
    private Set<FormaPagamento> formasPagamento;

    public Excursao(DadosExcursao dadosExcursao) {
        this.tituloExcursao = dadosExcursao.tituloExcursao();
        this.cidadeOrigemExcursao = dadosExcursao.cidadeOrigemExcursao();
        this.cidadeDestinoExcursao = dadosExcursao.cidadeDestinoExcursao();
        this.descricaoExcursao = dadosExcursao.descricaoExcursao();
        this.valorExcursao = dadosExcursao.valorExcursao();
        this.dataIdaExcursao = dadosExcursao.dataIdaExcursao();
        this.dataVoltaExcursao = dadosExcursao.dataVoltaExcursao();
        this.horaIdaExcursao = dadosExcursao.horaIdaExcursao();
        this.horaVoltaExcursao = dadosExcursao.horaVoltaExcursao();
        this.canceladaExcursao = dadosExcursao.canceladaExcursao();
    }

    public void atualizarInformacoes(DadosExcursaoAtualizar dadosExcursao){
        if (dadosExcursao.tituloExcursao() != null){
            this.tituloExcursao = dadosExcursao.tituloExcursao();
        }
        if (dadosExcursao.cidadeOrigemExcursao() != null){
            this.cidadeOrigemExcursao = dadosExcursao.cidadeOrigemExcursao();
        }
        if (dadosExcursao.cidadeDestinoExcursao() != null){
            this.cidadeDestinoExcursao = dadosExcursao.cidadeDestinoExcursao();
        }
        if (dadosExcursao.descricaoExcursao() != null){
            this.descricaoExcursao = dadosExcursao.descricaoExcursao();
        }

        this.valorExcursao = dadosExcursao.valorExcursao();

        if (dadosExcursao.dataIdaExcursao() != null){
            this.dataIdaExcursao = dadosExcursao.dataIdaExcursao();
        }
        if (dadosExcursao.dataVoltaExcursao() != null){
            this.dataVoltaExcursao = dadosExcursao.dataVoltaExcursao();
        }
        if (dadosExcursao.horaIdaExcursao() != null){
            this.horaIdaExcursao = dadosExcursao.horaIdaExcursao();
        }
        if (dadosExcursao.horaVoltaExcursao() != null){
            this.horaVoltaExcursao = dadosExcursao.horaVoltaExcursao();
        }
        if (dadosExcursao.canceladaExcursao() != null){
            this.canceladaExcursao = dadosExcursao.canceladaExcursao();
        }
    }

    public void excluir(){
        this.canceladaExcursao = true;
    }
}
