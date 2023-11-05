package tcc.goexcursao.apiGoExcursao.domain.excursao;

import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosExcursao(
        @NotNull
        Long idUsuarioExcursao,
        @NotBlank
        String tituloExcursao,
        @NotBlank
        String cidadeOrigemExcursao,
        @NotBlank
        String cidadeDestinoExcursao,
        @NotBlank
        String descricaoExcursao,
        @DecimalMin(value = "0.00", inclusive = false)
        @DecimalMax(value = "99999999.99")
        Double valorExcursao,
        @NotNull
        @FutureOrPresent
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate dataIdaExcursao,
        @NotNull
        @FutureOrPresent
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate dataVoltaExcursao,
        @NotNull
        @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
        LocalTime horaIdaExcursao,
        @NotNull
        @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
        LocalTime horaVoltaExcursao,
        @NotNull
        Long categoriaExcursao,
        @NotNull
        Boolean canceladaExcursao,
        @NotBlank
        String localEmbarqueExcursao,
        String urlImagensExcursao

) {
}
