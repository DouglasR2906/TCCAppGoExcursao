package tcc.goexcursao.apiGoExcursao.domain.excursao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

public interface ExcrusaoRepository extends JpaRepository<Excursao, Long> {
    Page<Excursao> findAllByCanceladaExcursaoTrue(Pageable paginacao);

    Page<Excursao> findAllByUsuario(Usuario usuario, Pageable paginacao);

    Page<Excursao> findAllByCanceladaExcursaoFalse(Pageable paginacao);
}
