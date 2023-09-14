package tcc.goexcursao.apiGoExcursao.domain.reserva;

import java.math.BigDecimal;

public record DadosReservaListagem(
        Long idReserva,
        //Long idUsuarioReserva,
        Long idExcursaoReserva,
        int qtdViajantesReserva,
        BigDecimal valorTotalReserva,
        int formaPagtoReserva
) {
    public DadosReservaListagem(Reserva reserva) {
        this(reserva.getIdReserva(),
                //reserva.getDivulgador().getIdUsuario(),
                reserva.getExcursao().getIdExcursao(),
                reserva.getQtdViajantesReserva(),
                reserva.getValorTotalReserva(),
                reserva.getFormaPagtoReserva());
    }
}
