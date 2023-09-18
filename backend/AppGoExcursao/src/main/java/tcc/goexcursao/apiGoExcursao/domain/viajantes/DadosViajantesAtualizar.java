package tcc.goexcursao.apiGoExcursao.domain.viajantes;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosViajantesAtualizar(
        @NotNull
        Long idViajantes,
        @NotNull
        Long idReservaViajantes,
        String nomeViajantes,
        @Pattern(regexp = "(?:\\d{11})?")
        String documentoViajantes
) {
}
