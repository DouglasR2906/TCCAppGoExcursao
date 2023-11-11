package tcc.goexcursao.apiGoExcursao.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import tcc.goexcursao.apiGoExcursao.domain.municipio.*;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("municipio")
@SecurityRequirement(name = "bearer-key")
public class MunicipioController {

    @Autowired
    private MunicipioRepository municipioRepository;

    @Autowired
    TradorDeErros tradorDeErros;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosMunicipioListagem> cadastrar(@RequestBody @Valid DadosMunicipio dados, UriComponentsBuilder uriBuilder) {
        var municipio=  new Municipio(dados);
        municipioRepository.save(municipio);
        var uri = uriBuilder.path("/municipio/{id}").buildAndExpand(municipio.getIdMunicipio()).toUri();
        return ResponseEntity.created(uri).body(new DadosMunicipioListagem(municipio));
    }

    @PostMapping("/inserirVarios")
    @Transactional
    public ResponseEntity<List<DadosMunicipioListagem>> cadastrarVarios(@RequestBody @Valid DadosMunicipioInsert dados, UriComponentsBuilder uriBuilder) {
        var estado = dados.sigla();
        List<DadosMunicipioListagem> municipios = new ArrayList<>();
        for (String municipio: dados.cidades()) {
            var novoMunicipio =  new Municipio(municipio, estado);
            municipioRepository.save(novoMunicipio);
            municipios.add(new DadosMunicipioListagem(novoMunicipio));
        }
        var uri = uriBuilder.path("/municipio").build().toUri();
        return ResponseEntity.created(uri).body(municipios);
    }
    @GetMapping
    public ResponseEntity<List<DadosMunicipioListagem>> listar(){
        List<Municipio> municipios = municipioRepository.findAll();
        municipios.sort(Comparator.comparing(Municipio::getNomeMunicipio));
        var municipiosOrdenados = municipios.stream().map(DadosMunicipioListagem::new).toList();
        return ResponseEntity.ok(municipiosOrdenados);
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<Page<DadosMunicipioListagem>> listar(@PageableDefault(size  =10, sort = {"descricaFormaPagamento"}) Pageable paginacao){
        var pageMunicipio = municipioRepository.findAll(paginacao).map(DadosMunicipioListagem::new);
        return ResponseEntity.ok(pageMunicipio);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosMunicipioListagem> findById(@PathVariable Long id){
        var municipio = municipioRepository.findById(id).orElse(null);
        return ResponseEntity.ok(new DadosMunicipioListagem(municipio));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosMunicipioListagem> atualizar(@RequestBody @Valid DadosMunicipioAtualizar dadosMunicipioAtualizar){
        var municipio = municipioRepository.getReferenceById(dadosMunicipioAtualizar.idMunicipio());
        municipio.atualizarMunicipio(dadosMunicipioAtualizar);
        return ResponseEntity.ok(new DadosMunicipioListagem(municipio));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        municipioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
