package tcc.goexcursao.apiGoExcursao.domain.usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RespostaAutenticacao {
    private Long idUsuario;
    private String loginUsuario;
    private String tokenUsuario;
    private TipoUsuario tipoUsuario;
    private String nomeUsuario;
}
