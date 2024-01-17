package tcc.goexcursao.apiGoExcursao.domain.municipio;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MunicipioRepository extends JpaRepository<Municipio, Long> {
    Page<Municipio> findAll(Pageable paginacao);
}
