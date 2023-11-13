package tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais;

import jakarta.validation.constraints.NotBlank;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

import java.time.LocalDate;

public record DadosCadastraisDetalhado(
    Long idDadosCadastrais,
    Long idUsuarioDadosCadastrais,
    String nomeDadosCadastrais,
    String documentoDadosCadastrais,
    LocalDate dataNascimentoDadosCadastrais,
    String cidadeDadosCadastrais,
    String ufDadosCadastrais,
    String logradouroDadosCadastrais,
    Integer numeroDadosCadastrais,
    String bairroDadosCadastrais,
    String cepDadosCadastrais,
    String telefoneDadosCadastrais,
    SexoDadosCadastrais sexoDadosCadastrais
     ) {
    public DadosCadastraisDetalhado(DadosCadastrais dadosCadastrais){
        this(dadosCadastrais.getIdDadosCadastrais(),
        dadosCadastrais.getUsuario().getIdUsuario(),
        dadosCadastrais.getNomeDadosCadastrais(),
        dadosCadastrais.getDocumentoDadosCadastrais(),
        dadosCadastrais.getDataNascimentoDadosCadastrais(),
        dadosCadastrais.getCidadeDadosCadastrais(),
        dadosCadastrais.getUfDadosCadastrais(),
        dadosCadastrais.getLogradouroDadosCadastrais(),
        dadosCadastrais.getNumeroDadosCadastrais(),
        dadosCadastrais.getBairroDadosCadastrais(),
        dadosCadastrais.getCepDadosCadastrais(),
        dadosCadastrais.getTelefoneDadosCadastrais(),
        dadosCadastrais.getSexoDadosCadastrais());
    }
}
