package tcc.goexcursao.apiGoExcursao.domain.viajantes;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import tcc.goexcursao.apiGoExcursao.domain.reserva.Reserva;

import java.util.List;
import java.util.Optional;

public interface ViajantesRepository extends JpaRepository<Viajantes, Long> {
    List<Viajantes> findByReserva(Reserva reserva);
}
