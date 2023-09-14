package tcc.goexcursao.apiGoExcursao.domain.usuario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByLoginUsuario(String login);

    Page<DadosUsuarioListagem> findAllByAtivoUsuarioTrue(Pageable paginacao);

    Page<DadosUsuarioListagem> findAllByAtivoUsuarioFalse(Pageable paginacao);
}