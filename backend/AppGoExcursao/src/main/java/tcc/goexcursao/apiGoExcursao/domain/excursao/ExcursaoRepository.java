package tcc.goexcursao.apiGoExcursao.domain.excursao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

import java.time.LocalDate;
import java.util.List;

public interface ExcursaoRepository extends JpaRepository<Excursao, Long> {
    Page<Excursao> findAllByCanceladaExcursaoTrue(Pageable paginacao);

    Page<Excursao> findAllByUsuario(Usuario usuario, Pageable paginacao);

    Page<Excursao> findAllByCanceladaExcursaoFalse(Pageable paginacao);

    @Transactional(readOnly = true)
    @Query("""
            SELECT e FROM Excursao e
            WHERE
            (:cidadeDestino IS NULL OR e.cidadeDestinoExcursao = :cidadeDestino) 
            AND (:dataInicio IS NULL OR e.dataIdaExcursao >= :dataInicio)
            AND (:dataFinal IS NULL OR e.dataIdaExcursao <= :dataFinal)
            """
    )
    Page<Excursao> buscarPorDestinoDataIda(@Param("cidadeDestino") String cidadeDestino,
                                           @Param("dataInicio") LocalDate dataInicio,
                                           @Param("dataFinal") LocalDate dataFinal,
                                           Pageable paginacao);
}
