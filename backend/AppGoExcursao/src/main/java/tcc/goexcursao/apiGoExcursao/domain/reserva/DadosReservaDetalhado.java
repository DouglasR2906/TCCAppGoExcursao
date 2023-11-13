package tcc.goexcursao.apiGoExcursao.domain.reserva;

import tcc.goexcursao.apiGoExcursao.domain.excursao.Excursao;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.Viajantes;

import java.math.BigDecimal;
import java.util.List;

public record DadosReservaDetalhado(
        Long idReserva,
        Long idExcursaoReserva,
        Long idClienteReserva,
        int qtdViajantesReserva,
        BigDecimal valorTotalReserva,
        String formaPagtoReserva,
        int statusReserva
) {
    public DadosReservaDetalhado(Reserva reserva) {
        this(reserva.getIdReserva(),
                reserva.getExcursao().getIdExcursao(),
                reserva.getCliente().getIdUsuario(),
                reserva.getQtdViajantesReserva(),
                reserva.getValorTotalReserva(),
                reserva.getFormaPagtoReserva().getDescricaoFormaPagamento(),
                reserva.getStatusReserva());
    }
}
