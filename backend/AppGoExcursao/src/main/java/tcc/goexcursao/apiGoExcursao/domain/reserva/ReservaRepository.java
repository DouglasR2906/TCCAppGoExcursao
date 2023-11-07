package tcc.goexcursao.apiGoExcursao.domain.reserva;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    Page<Reserva> findAllByDivulgador(Usuario divulgador, Pageable paginacao);
}
