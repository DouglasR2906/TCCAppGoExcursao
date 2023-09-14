package tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.format.annotation.DateTimeFormat;

public record DadosCadastraisAtualizar(
    @NotNull
    Long idDadosCadastrais,
    String nomeDadosCadastrais,
    String documentoDadosCadastrais,
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate dataNascimentoDadosCadastrais,
    String paisDadosCadastrais,
    String cidadeDadosCadastrais,
    String ufDadosCadastrais,
    @Email(message = "{email.invalido}")
    String emailDadosCadastrais,
    @Pattern(regexp = "(?:\\d{10,11})?")
    String telefone1DadosCadastrais,
    @Pattern (regexp = "(?:\\d{10,11})?")
    String telefone2DadosCadastrais,
    String senhaDadosCadastrais,
    SexoDadosCadastrais sexoDadosCadastrais
     ) {   
}
