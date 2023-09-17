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
    @Column(name = "id_dadosCadastrais")
    private Long idDadosCadastrais;
    @OneToOne
    @JoinColumn(name = "id_usuario_dadosCadastrais")
    private Usuario usuario;
    @Column(name = "nome_dadosCadastrais")
    private String nomeDadosCadastrais;
    @Column(name = "documento_dadosCadastrais")
    private String documentoDadosCadastrais;
    @Column(name = "data_nascimento_dadosCadastrais")
    LocalDate dataNascimentoDadosCadastrais;
    @Column(name = "pais_dadosCadastrais")
    private String paisDadosCadastrais;
    @Column(name = "cidade_dadosCadastrais")
    private String cidadeDadosCadastrais;
    @Column(name = "uf_dadosCadastrais")
    private String ufDadosCadastrais;
    @Column(name = "email_dadosCadastrais")
    private String emailDadosCadastrais;
    @Column(name = "telefone1_dadosCadastrais")
    private String telefone1DadosCadastrais;
    @Column(name = "telefone2_dadosCadastrais")
    private String telefone2DadosCadastrais;
    @Column(name = "senha_dadosCadastrais")
    private String senhaDadosCadastrais;
    @Enumerated(EnumType.STRING)
    @Column(name = "sexo_dadosCadastrais")
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
        this.senhaDadosCadastrais = dadosCadastro.senhaDadosCadastrais();
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
        if (dadosDadosCadastrais.senhaDadosCadastrais() != null){
            this.senhaDadosCadastrais = dadosDadosCadastrais.senhaDadosCadastrais();
        }
        if (dadosDadosCadastrais.sexoDadosCadastrais() != null){
            this.sexoDadosCadastrais = dadosDadosCadastrais.sexoDadosCadastrais();
        }
    }
}