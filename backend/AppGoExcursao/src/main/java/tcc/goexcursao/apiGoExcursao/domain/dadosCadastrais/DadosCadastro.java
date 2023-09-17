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
    
    @NotBlank
    String paisDadosCadastrais,
    
    @NotBlank
    String cidadeDadosCadastrais,
    
    @NotBlank
    String ufDadosCadastrais,
    
    @NotBlank(message = "{email.obrigatorio}")
    @Email(message = "{email.invalido}")
    String emailDadosCadastrais,

    @NotBlank
    @Pattern(regexp = "\\d{10,11}") 
    String telefone1DadosCadastrais,
    
    @Pattern (regexp = "(?:\\d{10,11})?")
    String telefone2DadosCadastrais,
    
    @NotBlank
    String senhaDadosCadastrais,

    @NotNull
    SexoDadosCadastrais sexoDadosCadastrais,

    @NotNull
    Boolean ativoDadosCadastrais
     ) {   
}
