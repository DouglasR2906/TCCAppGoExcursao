package tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

@Table(name= "dadoscadastrais")
@Entity(name = "DadosCadastrais")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idDadosCadastrais")
public class DadosCadastrais {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dadoscadastrais")
    private Long idDadosCadastrais;
    @OneToOne
    @JoinColumn(name = "id_usuario_dadoscadastrais")
    private Usuario usuario;
    @Column(name = "nome_dadoscadastrais")
    private String nomeDadosCadastrais;
    @Column(name = "documento_dadoscadastrais")
    private String documentoDadosCadastrais;
    @Column(name = "data_nascimento_dadoscadastrais")
    LocalDate dataNascimentoDadosCadastrais;
    @Column(name = "pais_dadoscadastrais")
    private String paisDadosCadastrais;
    @Column(name = "cidade_dadoscadastrais")
    private String cidadeDadosCadastrais;
    @Column(name = "uf_dadoscadastrais")
    private String ufDadosCadastrais;
    @Column(name = "email_dadoscadastrais")
    private String emailDadosCadastrais;
    @Column(name = "telefone_1_dadoscadastrais")
    private String telefone1DadosCadastrais;
    @Column(name = "telefone_2_dadoscadastrais")
    private String telefone2DadosCadastrais;
    @Enumerated(EnumType.STRING)
    @Column(name = "sexo_dadoscadastrais")
    private SexoDadosCadastrais sexoDadosCadastrais;

    public DadosCadastrais(DadosCadastro dadosCadastro){
        this.nomeDadosCadastrais = dadosCadastro.nomeDadosCadastrais();
        this.documentoDadosCadastrais = dadosCadastro.documentoDadosCadastrais();
        this.dataNascimentoDadosCadastrais = dadosCadastro.dataNascimentoDadosCadastrais();
        this.paisDadosCadastrais = dadosCadastro.paisDadosCadastrais();
        this.cidadeDadosCadastrais = dadosCadastro.cidadeDadosCadastrais();
        this.ufDadosCadastrais = dadosCadastro.ufDadosCadastrais();
        this.emailDadosCadastrais = dadosCadastro.emailDadosCadastrais();
        this.telefone1DadosCadastrais = dadosCadastro.telefone1DadosCadastrais();
        this.telefone2DadosCadastrais = dadosCadastro.telefone2DadosCadastrais();
        this.sexoDadosCadastrais = dadosCadastro.sexoDadosCadastrais();
    }

    public void atualizarInformacoes(DadosCadastraisAtualizar dadosDadosCadastrais) {
        if (dadosDadosCadastrais.nomeDadosCadastrais() != null){
            this.nomeDadosCadastrais = dadosDadosCadastrais.nomeDadosCadastrais();
        }
        if (dadosDadosCadastrais.documentoDadosCadastrais() != null){
            this.documentoDadosCadastrais = dadosDadosCadastrais.documentoDadosCadastrais();
        }
        if (dadosDadosCadastrais.dataNascimentoDadosCadastrais() != null){
            this.dataNascimentoDadosCadastrais = dadosDadosCadastrais.dataNascimentoDadosCadastrais();
        }
        if (dadosDadosCadastrais.paisDadosCadastrais() != null){
            this.paisDadosCadastrais = dadosDadosCadastrais.paisDadosCadastrais();
        }
        if (dadosDadosCadastrais.cidadeDadosCadastrais() != null){
            this.cidadeDadosCadastrais = dadosDadosCadastrais.cidadeDadosCadastrais();
        }
        if (dadosDadosCadastrais.ufDadosCadastrais() != null){
            this.ufDadosCadastrais = dadosDadosCadastrais.ufDadosCadastrais();
        }
        if (dadosDadosCadastrais.emailDadosCadastrais() != null){
            this.emailDadosCadastrais = dadosDadosCadastrais.emailDadosCadastrais();
        }
        if (dadosDadosCadastrais.telefone1DadosCadastrais() != null){
            this.telefone1DadosCadastrais = dadosDadosCadastrais.telefone1DadosCadastrais();
        }
        if (dadosDadosCadastrais.telefone2DadosCadastrais() == null){
            this.telefone2DadosCadastrais = " ";
        }else {
            this.telefone2DadosCadastrais = dadosDadosCadastrais.telefone2DadosCadastrais();
        }
        if (dadosDadosCadastrais.sexoDadosCadastrais() != null){
            this.sexoDadosCadastrais = dadosDadosCadastrais.sexoDadosCadastrais();
        }
    }
}