package tcc.goexcursao.apiGoExcursao.domain.categoria;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.goexcursao.apiGoExcursao.domain.reserva.Reserva;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
