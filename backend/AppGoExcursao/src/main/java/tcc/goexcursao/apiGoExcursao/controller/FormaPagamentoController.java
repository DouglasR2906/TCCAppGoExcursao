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
import tcc.goexcursao.apiGoExcursao.domain.formaPagamento.*;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;

import java.util.List;

@RestController
@RequestMapping("formaPagamento")
@SecurityRequirement(name = "bearer-key")
public class FormaPagamentoController {

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    @Autowired
    TradorDeErros tradorDeErros;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosFormaPagamentoListagem> cadastrar(@RequestBody @Valid DadosFormaPagamento dados, UriComponentsBuilder uriBuilder) {
        var formaPagamento =  new FormaPagamento(dados);
        formaPagamentoRepository.save(formaPagamento);
        var uri = uriBuilder.path("/formaPagamento/{id}").buildAndExpand(formaPagamento.getIdFormaPagamento()).toUri();
        return ResponseEntity.created(uri).body(new DadosFormaPagamentoListagem(formaPagamento));
    }

    @GetMapping
    public ResponseEntity<List<DadosFormaPagamentoListagem>> listar(){
        var formaPagamento = formaPagamentoRepository.findAll().stream().map(DadosFormaPagamentoListagem::new).toList();
        return ResponseEntity.ok(formaPagamento);
    }

    @GetMapping("/listarTodas")
    public ResponseEntity<Page<DadosFormaPagamentoListagem>> listar(@PageableDefault(size  =10, sort = {"descricaFormaPagamento"}) Pageable paginacao){
        var pageFormaPagamento = formaPagamentoRepository.findAll(paginacao).map(DadosFormaPagamentoListagem::new);
        return ResponseEntity.ok(pageFormaPagamento);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosFormaPagamentoListagem> findById(@PathVariable Long id){
        var formaPagamento = formaPagamentoRepository.findById(id).orElse(null);
        return ResponseEntity.ok(new DadosFormaPagamentoListagem(formaPagamento));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosFormaPagamentoListagem> atualizar(@RequestBody @Valid DadosFormaPagamentoAtualizar dadosFormaPagamento){
        var formaPagamento = formaPagamentoRepository.getReferenceById(dadosFormaPagamento.idFormaPagamento());
        formaPagamento.atualizarFormaPagamento(dadosFormaPagamento);
        return ResponseEntity.ok(new DadosFormaPagamentoListagem(formaPagamento));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        formaPagamentoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
