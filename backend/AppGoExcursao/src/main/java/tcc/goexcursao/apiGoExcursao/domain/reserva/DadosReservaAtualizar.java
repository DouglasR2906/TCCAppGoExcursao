package tcc.goexcursao.apiGoExcursao.domain.reserva;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosReservaAtualizar(
        @NotNull
        Long idReserva,
        @NotNull
        Long idUsuarioReserva,
        @NotNull
        Long idExcursaoReserva,
        int qtdViajantesReserva,
        BigDecimal valorTotalReserva,
        Long formaPagtoReserva,
        int statusReserva
) {
}
