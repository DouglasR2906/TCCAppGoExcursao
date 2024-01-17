package tcc.goexcursao.apiGoExcursao.domain.excursao;

import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosExcursaoAtualizar(
        @NotNull
        Long idExcursao,
        @NotNull
        Long idUsuarioExcursao,
        String tituloExcursao,
        String cidadeOrigemExcursao,
        String cidadeDestinoExcursao,
        String descricaoExcursao,
        @DecimalMin(value = "0.00", inclusive = false)
        @DecimalMax(value = "99999999.99")
        double valorExcursao,
        @FutureOrPresent
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate dataIdaExcursao,
        @FutureOrPresent
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate dataVoltaExcursao,
        @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
        LocalTime horaIdaExcursao,
        @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
        LocalTime horaVoltaExcursao,
        Long idCategoriaExcursao,
        Boolean canceladaExcursao,
        String localEmbarqueExcursao,
        String urlImagensExcursao

) {
}
