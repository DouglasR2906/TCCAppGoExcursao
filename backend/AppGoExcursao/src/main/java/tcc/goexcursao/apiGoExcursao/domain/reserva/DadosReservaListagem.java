package tcc.goexcursao.apiGoExcursao.domain.reserva;

import java.math.BigDecimal;

public record DadosReservaListagem(
        Long idReserva,
        String tituloExcursaoReserva,
        String destinoExcursaoReserva,
        int qtdViajantesReserva,
        BigDecimal valorTotalReserva,
        String formaPagtoReserva,
        int statusReserva
) {
    public DadosReservaListagem(Reserva reserva) {
        this(reserva.getIdReserva(),
            reserva.getExcursao().getTituloExcursao(),
            reserva.getExcursao().getCidadeDestinoExcursao(),
            reserva.getQtdViajantesReserva(),
            reserva.getValorTotalReserva(),
            reserva.getFormaPagtoReserva().getDescricaoFormaPagamento(),
            reserva.getStatusReserva());
    }
}
