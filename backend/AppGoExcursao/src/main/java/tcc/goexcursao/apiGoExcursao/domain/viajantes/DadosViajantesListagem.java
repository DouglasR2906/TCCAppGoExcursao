package tcc.goexcursao.apiGoExcursao.domain.viajantes;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosViajantesListagem(
        Long idViajantes,
        Long idReservaViajantes,
        String nomeViajantes,
        String documentoViajantes
) {
        public DadosViajantesListagem(Viajantes viajantes){
                this(viajantes.getIdViajantes(),
                        viajantes.getReserva().getIdReserva(),
                        viajantes.getNomeViajantes(),
                        viajantes.getDocumentoViajantes());
        }
}
