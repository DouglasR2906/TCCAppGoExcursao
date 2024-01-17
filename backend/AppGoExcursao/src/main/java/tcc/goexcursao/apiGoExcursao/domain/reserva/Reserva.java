package tcc.goexcursao.apiGoExcursao.domain.reserva;

import jakarta.persistence.*;
import lombok.*;
import tcc.goexcursao.apiGoExcursao.domain.excursao.Excursao;
import tcc.goexcursao.apiGoExcursao.domain.formaPagamento.FormaPagamento;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.Viajantes;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Table(name = "reserva")
@Entity(name = "reserva")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idReserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reserva")
    private Long idReserva;

    @ManyToOne
    @JoinColumn(name = "id_usuario_reserva")
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "id_excursao_reserva")
    private Excursao excursao;

    @Column(name = "qtd_viajantes_reserva")
    private int qtdViajantesReserva;

    @Column(name = "valor_total_reserva", precision = 10, scale = 2)
    private BigDecimal valorTotalReserva;

    @ManyToOne
    @JoinColumn(name = "forma_pagto_reserva")
    private FormaPagamento formaPagtoReserva;

    @Column(name = "status_reserva")
    private int statusReserva;

    public Reserva(DadosReserva reserva){
        this.qtdViajantesReserva = reserva.qtdViajantesReserva();
        this.valorTotalReserva = reserva.valorTotalReserva();
    }

    public void atualizarReserva(DadosReservaAtualizar reserva){
        if(reserva.qtdViajantesReserva() != 0){
            this.qtdViajantesReserva = reserva.qtdViajantesReserva();
        }
        if (reserva.valorTotalReserva() != null){
            this.valorTotalReserva = reserva.valorTotalReserva();
        }
    }

    public void atualizarStatus(DadosReservaAtualizar reserva){
        this.statusReserva = reserva.statusReserva();
    }
}
