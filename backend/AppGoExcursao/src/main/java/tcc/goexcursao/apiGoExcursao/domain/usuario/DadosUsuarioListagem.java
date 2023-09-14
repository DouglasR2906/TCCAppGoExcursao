package tcc.goexcursao.apiGoExcursao.domain.usuario;

public record DadosUsuarioListagem(
    Long idUsuario,
    String loginUsuario,
    Boolean ativoUsuario
     ) {
    public DadosUsuarioListagem(Usuario usuario){
        this(usuario.getIdUsuario(), usuario.getLoginUsuario(), usuario.getAtivoUsuario());
    }

    public DadosUsuarioListagem(DadosUsuarioListagem dadosUsuarioListagem) {
        this(dadosUsuarioListagem.idUsuario, dadosUsuarioListagem.loginUsuario, dadosUsuarioListagem.ativoUsuario);
    }
}
