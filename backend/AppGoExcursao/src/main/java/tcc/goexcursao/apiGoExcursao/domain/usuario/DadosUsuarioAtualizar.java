package tcc.goexcursao.apiGoExcursao.domain.usuario;

import jakarta.validation.constraints.NotNull;

public record DadosUsuarioAtualizar(
    @NotNull
    Long idUsuario,
    String loginUsuario,
    String senhaUsuario,
    Boolean ativoUsuario
     ) {   
}
