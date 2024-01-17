package tcc.goexcursao.apiGoExcursao.domain.municipio;

import jakarta.validation.constraints.NotBlank;

public record DadosMunicipioListagem(
        Long idMunicipio,
        String nomeMunicipio,
        String ufMunicipio
) {
    public DadosMunicipioListagem(Municipio municipio){
        this(municipio.getIdMunicipio(), municipio.getNomeMunicipio(), municipio.getUfMunicipio());
    }
}
