package tcc.goexcursao.apiGoExcursao.domain.usuario;

public record DadosUsuarioListagem(
    Long idUsuario,
    String loginUsuario,
    String senhaUsuario,
    Boolean ativoUsuario,
    TipoUsuario tipoUsuario
     ) {
    public DadosUsuarioListagem(Usuario usuario){
        this(usuario.getIdUsuario(), usuario.getLoginUsuario(), usuario.getSenhaUsuario(), usuario.getAtivoUsuario(), usuario.getTipoUsuario());
    }

    public DadosUsuarioListagem(DadosUsuarioListagem dadosUsuarioListagem) {
        this(dadosUsuarioListagem.idUsuario, dadosUsuarioListagem.loginUsuario, dadosUsuarioListagem.senhaUsuario(), dadosUsuarioListagem.ativoUsuario, dadosUsuarioListagem.tipoUsuario);
    }
}
