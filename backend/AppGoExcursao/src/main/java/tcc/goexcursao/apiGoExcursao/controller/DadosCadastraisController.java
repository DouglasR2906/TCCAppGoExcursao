package tcc.goexcursao.apiGoExcursao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import org.springframework.web.util.UriComponentsBuilder;
import tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais.*;

import java.util.List;

@RestController
@RequestMapping("dadosCadastrais")
public class DadosCadastraisController {

    @Autowired
    private DadosCadastraisRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosCadastraisDetalhado> cadastrar(@RequestBody @Valid DadosCadastro dadosCadastro, UriComponentsBuilder uriBuilder){
        var dadosCadastrais = new DadosCadastrais(dadosCadastro);
        repository.save(dadosCadastrais);
        var uri = uriBuilder.path("/DadosCadastrais/{id}").buildAndExpand(dadosCadastrais.getUsuario().getIdUsuario()).toUri();
        return ResponseEntity.created(uri).body(new DadosCadastraisDetalhado(dadosCadastrais));
    }

    @GetMapping
    public ResponseEntity<List<DadosCadastraisDetalhado>> listar(){
        var DadosCadastrais = repository.findAll().stream().map(DadosCadastraisDetalhado::new).toList();
        return ResponseEntity.ok(DadosCadastrais);
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<Page<DadosCadastraisListagem>> listar(@PageableDefault(size=10, sort = {"nomeDadosCadastrais"}) Pageable paginacao){
        var pageUsarios = repository.findAll(paginacao).map(DadosCadastraisListagem::new);
        return ResponseEntity.ok(pageUsarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosCadastraisDetalhado> findById(@PathVariable Long id){
        var DadosCadastrais = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosCadastraisDetalhado(DadosCadastrais));
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosCadastraisDetalhado> atualizar(@RequestBody @Valid DadosCadastraisAtualizar dadosCadastraisAtualizar){
        var dadosCadastrais = repository.getReferenceById(dadosCadastraisAtualizar.idDadosCadastrais());
        dadosCadastrais.atualizarInformacoes(dadosCadastraisAtualizar);
        return ResponseEntity.ok(new DadosCadastraisDetalhado(dadosCadastrais));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
