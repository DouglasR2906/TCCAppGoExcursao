package tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.format.annotation.DateTimeFormat;

public record DadosCadastraisAtualizar(
    @NotNull
    Long idDadosCadastrais,
    @NotNull
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
    @Pattern(regexp = "(?:\\d{10,11})?")
    String telefoneDadosCadastrais,
    SexoDadosCadastrais sexoDadosCadastrais
     ) {   
}
