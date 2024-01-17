package tcc.goexcursao.apiGoExcursao.domain.municipio;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "municipio")
@Table(name = "municipios")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idMunicipio")
public class Municipio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_municipio")
    private Long idMunicipio;

    @Column(name = "nome_municipio")
    private String nomeMunicipio;

    @Column(name = "uf_municipio")
    private  String ufMunicipio;

    public Municipio(DadosMunicipio dadosMunicipio){
        this.nomeMunicipio = dadosMunicipio.nomeMunicipio();
        this.ufMunicipio = dadosMunicipio.ufMunicipio();
    }

    public Municipio(String nomeMunicipio, String ufMunicipio){
        this.nomeMunicipio = nomeMunicipio;
        this.ufMunicipio = ufMunicipio;
    }

    public void atualizarMunicipio(DadosMunicipioAtualizar dadosMunicipioAtualizar){
        if (dadosMunicipioAtualizar.nomeMunicipio() != null){
            this.nomeMunicipio = dadosMunicipioAtualizar.nomeMunicipio();
        }
        if (dadosMunicipioAtualizar.ufMunicipio() != null){
            this.ufMunicipio = dadosMunicipioAtualizar.ufMunicipio();
        }
    }
}
