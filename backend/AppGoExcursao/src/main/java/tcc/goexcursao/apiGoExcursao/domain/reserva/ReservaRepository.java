package tcc.goexcursao.apiGoExcursao.domain.reserva;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.repository.JpaRepository;
import tcc.goexcursao.apiGoExcursao.domain.excursao.Excursao;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    Page<Reserva> findAllByCliente(Usuario cliente, Pageable paginacao);

    Page<Reserva> findAllByExcursao(Excursao excursao, Pageable paginacao);
}
