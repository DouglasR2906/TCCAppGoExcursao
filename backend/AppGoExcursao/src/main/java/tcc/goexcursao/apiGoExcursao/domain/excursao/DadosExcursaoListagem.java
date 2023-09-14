package tcc.goexcursao.apiGoExcursao.domain.excursao;

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
        LocalDate dataIdaExcursao,
        LocalDate dataVoltaExcursao,
        LocalTime horaIdaExcursao,
        LocalTime horaVoltaExcursao,
        Long idCategoriaExcursao,
        Boolean canceladaExcursao
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
                excursao. getCategoria().getIdCategoria(),
                excursao.getCanceladaExcursao()
        );
    }
}
