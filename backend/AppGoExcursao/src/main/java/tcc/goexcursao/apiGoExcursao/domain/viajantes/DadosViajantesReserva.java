package tcc.goexcursao.apiGoExcursao.domain.viajantes;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosViajantes(
        @NotNull
        Long idReservaViajantes,
        @NotBlank
        String nomeViajantes,
        @NotBlank
        @Pattern(regexp = "\\d{11}|")
        String documentoViajantes
) {
}
