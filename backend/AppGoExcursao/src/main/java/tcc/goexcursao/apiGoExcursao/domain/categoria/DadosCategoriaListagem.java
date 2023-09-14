package tcc.goexcursao.apiGoExcursao.domain.categoria;

import jakarta.validation.constraints.NotBlank;

public record DadosCategoriaListagem(
        Long idCategoria,
        String descricaoCategoria
) {
        public DadosCategoriaListagem(Categoria categoria){
                this(categoria.getIdCategoria(), categoria.getDescricaoCategoria());
        }
}
