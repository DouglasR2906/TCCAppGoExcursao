package tcc.goexcursao.apiGoExcursao.domain.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosUsuario(
    @NotBlank
    String loginUsuario,
    @NotBlank
    String senhaUsuario,
    @NotNull
    Boolean ativoUsuario
     ) {
    public DadosUsuario(Usuario usuario){
        this(usuario.getLoginUsuario(), usuario.getSenhaUsuario(), usuario.getAtivoUsuario());
    }
}
