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
    @Column(name = "cidade_dadoscadastrais")
    private String cidadeDadosCadastrais;
    @Column(name = "uf_dadoscadastrais")
    private String ufDadosCadastrais;
    @Column(name = "email_dadoscadastrais")
    private String emailDadosCadastrais;
    @Column(name = "telefone_1_dadoscadastrais")
    private String telefoneDadosCadastrais;
    @Enumerated(EnumType.STRING)
    @Column(name = "sexo_dadoscadastrais")
    private SexoDadosCadastrais sexoDadosCadastrais;

    public DadosCadastrais(DadosCadastro dadosCadastro){
        this.nomeDadosCadastrais = dadosCadastro.nomeDadosCadastrais();
        this.documentoDadosCadastrais = dadosCadastro.documentoDadosCadastrais();
        this.dataNascimentoDadosCadastrais = dadosCadastro.dataNascimentoDadosCadastrais();
        this.cidadeDadosCadastrais = dadosCadastro.cidadeDadosCadastrais();
        this.ufDadosCadastrais = dadosCadastro.ufDadosCadastrais();
        this.emailDadosCadastrais = dadosCadastro.emailDadosCadastrais();
        this.telefoneDadosCadastrais = dadosCadastro.telefoneDadosCadastrais();
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
        if (dadosDadosCadastrais.cidadeDadosCadastrais() != null){
            this.cidadeDadosCadastrais = dadosDadosCadastrais.cidadeDadosCadastrais();
        }
        if (dadosDadosCadastrais.ufDadosCadastrais() != null){
            this.ufDadosCadastrais = dadosDadosCadastrais.ufDadosCadastrais();
        }
        if (dadosDadosCadastrais.emailDadosCadastrais() != null){
            this.emailDadosCadastrais = dadosDadosCadastrais.emailDadosCadastrais();
        }
        if (dadosDadosCadastrais.telefoneDadosCadastrais() != null){
            this.telefoneDadosCadastrais = dadosDadosCadastrais.telefoneDadosCadastrais();
        }
        if (dadosDadosCadastrais.sexoDadosCadastrais() != null){
            this.sexoDadosCadastrais = dadosDadosCadastrais.sexoDadosCadastrais();
        }
    }
}