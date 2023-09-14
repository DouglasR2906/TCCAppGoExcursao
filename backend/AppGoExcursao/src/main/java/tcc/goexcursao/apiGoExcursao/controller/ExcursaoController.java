package tcc.goexcursao.apiGoExcursao.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import tcc.goexcursao.apiGoExcursao.domain.excursao.*;
import tcc.goexcursao.apiGoExcursao.domain.usuario.UsuarioRepository;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.util.List;

@RestController
@RequestMapping("excursao")
public class ExcursaoController {

    @Autowired
    private ExcrusaoRepository repository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    TradorDeErros tradorDeErros;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosExcursaoListagem> cadastrar(@RequestBody @Valid DadosExcursao dadosExcursao, UriComponentsBuilder uriBuilder) {
        var usuario = usuarioRepository.findById(dadosExcursao.idUsuarioExcursao()).orElse(null);
        Excursao excursao = null;
        if (usuario != null) {
            excursao = new Excursao(dadosExcursao);
            excursao.setUsuario(usuario);
            repository.save(excursao);
        }else {
            tradorDeErros.tratarErro404();
            throw new ValidacaoException("Usuário informado não encontrado!");
        }

        var uri = uriBuilder.path("/excursao/{id}").buildAndExpand(excursao.getIdExcursao()).toUri();
        return ResponseEntity.created(uri).body(new DadosExcursaoListagem(excursao));
    }

    @GetMapping
    public ResponseEntity<List<DadosExcursaoListagem>> listar(){
        var excursoes = repository.findAll().stream().map(DadosExcursaoListagem::new).toList();
        return ResponseEntity.ok(excursoes);
    }

    @GetMapping("/listarTodas")
    public ResponseEntity<Page<DadosExcursaoListagem>> listar(@PageableDefault(size  =10, sort = {"tituloExcursao"}) Pageable paginacao){
        var pageExcursoes = repository.findAll(paginacao).map(DadosExcursaoListagem::new);
        return ResponseEntity.ok(pageExcursoes);
    }

    @GetMapping("/listarCanceladas")
    public ResponseEntity<Page<DadosExcursaoListagem>> listarCanceladas(@PageableDefault(size  =10, sort = {"tituloExcursao"}) Pageable paginacao){
        var pageExcursoes = repository.findAllByCanceladaExcursaoTrue(paginacao).map(DadosExcursaoListagem::new);
        return ResponseEntity.ok(pageExcursoes);
    }

    @GetMapping("/listarAtivas")
    public ResponseEntity<Page<DadosExcursaoListagem>> listarAtivas(@PageableDefault(size  =10, sort = {"tituloExcursao"}) Pageable paginacao){
        var pageExcursoes =  repository.findAllByCanceladaExcursaoFalse(paginacao).map(DadosExcursaoListagem::new);
        return ResponseEntity.ok(pageExcursoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosExcursaoListagem> findById(@PathVariable Long id){
        var excursao = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosExcursaoListagem(excursao));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosExcursaoListagem> atualizar(@RequestBody @Valid DadosExcursaoAtualizar dadosExcursao){
        var excursao = repository.getReferenceById(dadosExcursao.idExcursao());
        excursao.atualizarInformacoes(dadosExcursao);
        return ResponseEntity.ok(new DadosExcursaoListagem(excursao));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        var excursao = repository.getReferenceById(id);
        excursao.excluir();
        return ResponseEntity.noContent().build();
    }

}
