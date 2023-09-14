package tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais;

import java.time.LocalDate;

public record DadosCadastraisDetalhado(
    Long idDadosCadastrais,
    String nomeDadosCadastrais,
    String documentoDadosCadastrais,
    LocalDate dataNascimentoDadosCadastrais,
    String paisDadosCadastrais,
    String cidadeDadosCadastrais,
    String ufDadosCadastrais,
    String emailDadosCadastrais,
    String telefone1DadosCadastrais,
    String telefone2DadosCadastrais,
    SexoDadosCadastrais sexoDadosCadastrais
     ) {
    public DadosCadastraisDetalhado(DadosCadastrais dadosCadastrais){
        this(dadosCadastrais.getUsuario().getIdUsuario(),
        dadosCadastrais.getNomeDadosCadastrais(),
        dadosCadastrais.getDocumentoDadosCadastrais(),
        dadosCadastrais.getDataNascimentoDadosCadastrais(),
        dadosCadastrais.getPaisDadosCadastrais(),
        dadosCadastrais.getCidadeDadosCadastrais(),
        dadosCadastrais.getUfDadosCadastrais(),
        dadosCadastrais.getEmailDadosCadastrais(),
        dadosCadastrais.getTelefone1DadosCadastrais(),
        dadosCadastrais.getTelefone2DadosCadastrais(),
        dadosCadastrais.getSexoDadosCadastrais());
    }
}
