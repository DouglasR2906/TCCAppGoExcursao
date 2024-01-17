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
    @Column(name = "logradouro_dadoscadastrais")
    private String logradouroDadosCadastrais;
    @Column(name = "numero_dadoscadastrais")
    private Integer numeroDadosCadastrais;
    @Column(name = "bairro_dadoscadastrais")
    private String bairroDadosCadastrais;
    @Column(name = "cep_dadoscadastrais")
    private String cepDadosCadastrais;
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
        this.logradouroDadosCadastrais = dadosCadastro.logradouroDadosCadastrais();
        this.numeroDadosCadastrais = dadosCadastro.numeroDadosCadastrais();
        this.bairroDadosCadastrais = dadosCadastro.bairroDadosCadastrais();
        this.cepDadosCadastrais = dadosCadastro.cepDadosCadastrais();
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
        if (dadosDadosCadastrais.logradouroDadosCadastrais() != null){
            this.logradouroDadosCadastrais = dadosDadosCadastrais.logradouroDadosCadastrais();
        }
        if (dadosDadosCadastrais.numeroDadosCadastrais() != null){
            this.numeroDadosCadastrais = dadosDadosCadastrais.numeroDadosCadastrais();
        }
        if (dadosDadosCadastrais.bairroDadosCadastrais() != null){
            this.bairroDadosCadastrais = dadosDadosCadastrais.bairroDadosCadastrais();
        }
        if (dadosDadosCadastrais.cepDadosCadastrais() != null){
            this.cepDadosCadastrais = dadosDadosCadastrais.cepDadosCadastrais();
        }
        if (dadosDadosCadastrais.telefoneDadosCadastrais() != null){
            this.telefoneDadosCadastrais = dadosDadosCadastrais.telefoneDadosCadastrais();
        }
        if (dadosDadosCadastrais.sexoDadosCadastrais() != null){
            this.sexoDadosCadastrais = dadosDadosCadastrais.sexoDadosCadastrais();
        }
    }
}