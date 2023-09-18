package tcc.goexcursao.apiGoExcursao.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
import tcc.goexcursao.apiGoExcursao.domain.usuario.UsuarioRepository;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.util.List;

@RestController
@RequestMapping("dadosCadastrais")
@SecurityRequirement(name = "bearer-key")
public class DadosCadastraisController {

    @Autowired
    private DadosCadastraisRepository dadosCadastraisRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosCadastraisDetalhado> cadastrar(@RequestBody @Valid DadosCadastro dadosCadastro, UriComponentsBuilder uriBuilder){
        var usuario = usuarioRepository.getReferenceById(dadosCadastro.idUsuarioDadosCadastrais());
        var dadosCadastrais = new DadosCadastrais(dadosCadastro);
        dadosCadastrais.setUsuario(usuario);
        dadosCadastraisRepository.save(dadosCadastrais);
        var uri = uriBuilder.path("/DadosCadastrais/{id}").buildAndExpand(dadosCadastrais.getIdDadosCadastrais()).toUri();
        return ResponseEntity.created(uri).body(new DadosCadastraisDetalhado(dadosCadastrais));
    }

    @GetMapping
    public ResponseEntity<List<DadosCadastraisDetalhado>> listar(){
        var dadosCadastrais = dadosCadastraisRepository.findAll().stream().map(DadosCadastraisDetalhado::new).toList();
        return ResponseEntity.ok(dadosCadastrais);
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<Page<DadosCadastraisListagem>> listar(@PageableDefault(size=10, sort = {"nomeDadosCadastrais"}) Pageable paginacao){
        var pageUsarios = dadosCadastraisRepository.findAll(paginacao).map(DadosCadastraisListagem::new);
        return ResponseEntity.ok(pageUsarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosCadastraisDetalhado> findById(@PathVariable Long id){
        var DadosCadastrais = dadosCadastraisRepository.getReferenceById(id);
        return ResponseEntity.ok(new DadosCadastraisDetalhado(DadosCadastrais));
    }
    @GetMapping("/usuario/{id}")
    public ResponseEntity<DadosCadastraisDetalhado> findByIdUsuario(@PathVariable Long id){
        var usuario = usuarioRepository.getReferenceById(id);
        var dadosCadastrais = dadosCadastraisRepository.findByUsuario(usuario);
        return ResponseEntity.ok(new DadosCadastraisDetalhado(dadosCadastrais));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosCadastraisDetalhado> atualizar(@RequestBody @Valid DadosCadastraisAtualizar dadosCadastraisAtualizar){
        var dadosCadastrais = dadosCadastraisRepository.getReferenceById(dadosCadastraisAtualizar.idDadosCadastrais());
        dadosCadastrais.atualizarInformacoes(dadosCadastraisAtualizar);
        return ResponseEntity.ok(new DadosCadastraisDetalhado(dadosCadastrais));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        dadosCadastraisRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
