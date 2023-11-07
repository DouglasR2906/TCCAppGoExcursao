package tcc.goexcursao.apiGoExcursao.domain.reserva;

import jakarta.validation.constraints.NotNull;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.DadosViajantes;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.DadosViajantesReserva;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.Viajantes;

import java.math.BigDecimal;
import java.util.List;

public record DadosReserva(
        @NotNull
        Long idUsuarioReserva,
        @NotNull
        Long idExcursaoReserva,
        int qtdViajantesReserva,
        BigDecimal valorTotalReserva,
        Long formaPagtoReserva,
        @NotNull
        List<DadosViajantesReserva> viajantes
) {
}
