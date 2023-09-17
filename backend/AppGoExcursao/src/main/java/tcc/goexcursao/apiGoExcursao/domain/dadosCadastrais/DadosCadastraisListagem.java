package tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais;

import java.time.LocalDate;

public record DadosCadastraisListagem(
    Long idDadosCadastrais,
    Long idUsuarioDadosCadastrais,
    String nomeDadosCadastrais,
    String documentoDadosCadastrais,
    LocalDate dataNascimentoDadosCadastrais,
    String paisDadosCadastrais,
    String cidadeDadosCadastrais,
    String ufDadosCadastrais,
    SexoDadosCadastrais sexoDadosCadastrais
     ) {   
    public DadosCadastraisListagem(DadosCadastrais dadosCadastrais){
        this(dadosCadastrais.getIdDadosCadastrais(),
                dadosCadastrais.getUsuario().getIdUsuario(),
                dadosCadastrais.getNomeDadosCadastrais(),
                dadosCadastrais.getDocumentoDadosCadastrais(),
                dadosCadastrais.getDataNascimentoDadosCadastrais(),
                dadosCadastrais.getPaisDadosCadastrais(),
                dadosCadastrais.getCidadeDadosCadastrais(),
                dadosCadastrais.getUfDadosCadastrais(),
                dadosCadastrais.getSexoDadosCadastrais());
    }
}
