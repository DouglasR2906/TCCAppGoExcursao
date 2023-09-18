package tcc.goexcursao.apiGoExcursao.domain.categoria;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "Categoria")
@Table(name = "categoria")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idCategoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long idCategoria;

    @Column(name = "descricao_categoria")
    private String descricaoCategoria;

    public Categoria(DadosCategoria dados){
        this.descricaoCategoria = dados.descricaoCategoria();
    }

    public void atualizarCategoria(DadosCategoriaAtualizar dadosCategoria) {
        if (dadosCategoria.descricaoCategoria() != null){
            this.descricaoCategoria = dadosCategoria.descricaoCategoria();
        }
    }
}
