package tcc.goexcursao.apiGoExcursao.domain.excursao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExcrusaoRepository extends JpaRepository<Excursao, Long> {
    Page<Excursao> findAllByCanceladaExcursaoTrue(Pageable paginacao);

    Page<Excursao> findAllByCanceladaExcursaoFalse(Pageable paginacao);

    List<Excursao> findAllByIdUsuarioExcursao(Long id);
}
