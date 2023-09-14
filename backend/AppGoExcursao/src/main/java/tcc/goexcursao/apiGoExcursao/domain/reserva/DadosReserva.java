package tcc.goexcursao.apiGoExcursao.domain.reserva;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosReserva(
        @NotNull
        Long idUsuarioReserva,
        @NotNull
        Long idExcursaoReserva,
        int qtdViajantesReserva,
        BigDecimal valorTotalReserva,
        int formaPagtoReserva
) {
}
