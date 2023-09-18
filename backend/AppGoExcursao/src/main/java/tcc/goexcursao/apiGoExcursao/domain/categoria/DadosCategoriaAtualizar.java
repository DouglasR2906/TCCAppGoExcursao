package tcc.goexcursao.apiGoExcursao.domain.categoria;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCategoriaAtualizar(
        @NotNull
        Long idCategoria,
        @NotBlank
        String descricaoCategoria
) {
        public DadosCategoriaAtualizar(Categoria categoria){
                this(categoria.getIdCategoria(), categoria.getDescricaoCategoria());
        }
}
