package tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosCadastro(
    // Validações utilizadas do bean validation https://jakarta.ee/specifications/bean-validation/3.0/jakarta-bean-validation-spec-3.0.html#builtinconstraints
    // Para fazer algumas validações padrões como não receber o valor em branco ou null 

    @NotNull
    Long idUsuarioDadosCadastrais,
    @NotBlank(message = "{nome.obrigatorio}")
    String nomeDadosCadastrais,
    @NotBlank(message = "{documento.obrigatorio}")
    String documentoDadosCadastrais,
    LocalDate dataNascimentoDadosCadastrais,
    String cidadeDadosCadastrais,
    String ufDadosCadastrais,
    String logradouroDadosCadastrais,
    Integer numeroDadosCadastrais,
    String bairroDadosCadastrais,
    String cepDadosCadastrais,
    @NotBlank
    @Pattern(regexp = "\\d{10,11}") 
    String telefoneDadosCadastrais,
    @NotNull
    SexoDadosCadastrais sexoDadosCadastrais

     ) {   
}
