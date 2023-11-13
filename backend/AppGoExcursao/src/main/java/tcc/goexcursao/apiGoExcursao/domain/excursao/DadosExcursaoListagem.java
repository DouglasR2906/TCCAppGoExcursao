package tcc.goexcursao.apiGoExcursao.domain.excursao;

import com.fasterxml.jackson.annotation.JsonFormat;
import tcc.goexcursao.apiGoExcursao.domain.categoria.Categoria;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosExcursaoListagem(
        Long idExcursao,
        Long idUsuarioExcursao,
        String tituloExcursao,
        String cidadeOrigemExcursao,
        String cidadeDestinoExcursao,
        String descricaoExcursao,
        Double valorExcursao,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
        LocalDate dataIdaExcursao,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
        LocalDate dataVoltaExcursao,
        LocalTime horaIdaExcursao,
        LocalTime horaVoltaExcursao,
        Categoria categoriaExcursao,
        Boolean canceladaExcursao,
        String localEmbarqueExcursao,
        String urlImagensExcursao
) {
    public DadosExcursaoListagem(Excursao excursao){
        this(excursao.getIdExcursao(),
                excursao.getUsuario().getIdUsuario(),
                excursao.getTituloExcursao(),
                excursao.getCidadeOrigemExcursao(),
                excursao.getCidadeDestinoExcursao(),
                excursao.getDescricaoExcursao(),
                excursao.getValorExcursao(),
                excursao.getDataIdaExcursao(),
                excursao.getDataVoltaExcursao(),
                excursao.getHoraIdaExcursao(),
                excursao.getHoraVoltaExcursao(),
                excursao.getCategoria(),
                excursao.getCanceladaExcursao(),
                excursao.getLocalEmbarqueExcursao(),
                excursao.getUrlImagensExcursao()
        );
    }
}
