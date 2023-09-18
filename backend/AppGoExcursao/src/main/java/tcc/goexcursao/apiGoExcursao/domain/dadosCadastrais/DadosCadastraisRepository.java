package tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

public interface DadosCadastraisRepository extends JpaRepository<DadosCadastrais, Long> {
    DadosCadastrais findByUsuario(Usuario usuario);
}