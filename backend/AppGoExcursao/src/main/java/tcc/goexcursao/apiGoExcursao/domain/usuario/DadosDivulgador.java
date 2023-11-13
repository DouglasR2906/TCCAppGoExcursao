package tcc.goexcursao.apiGoExcursao.domain.usuario;

import tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais.DadosCadastrais;

public record DadosDivulgador(
        Long idUsuario,
        String loginUsuario,
        String nomeUsuario
) {
    public DadosDivulgador(Usuario usuario, DadosCadastrais dadosCadastrais){
        this(usuario.getIdUsuario(), usuario.getLoginUsuario(), dadosCadastrais.getNomeDadosCadastrais());
    }

    public DadosDivulgador(DadosDivulgador dadosDivulador) {
        this(dadosDivulador.idUsuario(), dadosDivulador.loginUsuario(),  dadosDivulador.nomeUsuario);
    }
}
