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
import tcc.goexcursao.apiGoExcursao.domain.categoria.*;
import tcc.goexcursao.apiGoExcursao.domain.excursao.ExcursaoRepository;
import tcc.goexcursao.apiGoExcursao.domain.reserva.*;
import tcc.goexcursao.apiGoExcursao.domain.usuario.DadosUsuarioListagem;
import tcc.goexcursao.apiGoExcursao.domain.usuario.UsuarioRepository;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.util.List;

@RestController
@RequestMapping("categoria")
@SecurityRequirement(name = "bearer-key")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    TradorDeErros tradorDeErros;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosCategoriaListagem> cadastrar(@RequestBody @Valid DadosCategoria dados, UriComponentsBuilder uriBuilder) {
        var categoria =  new Categoria(dados);
        categoriaRepository.save(categoria);
        var uri = uriBuilder.path("/categoria/{id}").buildAndExpand(categoria.getIdCategoria()).toUri();
        return ResponseEntity.created(uri).body(new DadosCategoriaListagem(categoria));
    }

    @GetMapping
    public ResponseEntity<List<DadosCategoriaListagem>> listar(){
        var categoria = categoriaRepository.findAll().stream().map(DadosCategoriaListagem::new).toList();
        return ResponseEntity.ok(categoria);
    }

    @GetMapping("/listarTodas")
    public ResponseEntity<Page<DadosCategoriaListagem>> listar(@PageableDefault(size  =10, sort = {"descricaCategoria"}) Pageable paginacao){
        var pageCategoria = categoriaRepository.findAll(paginacao).map(DadosCategoriaListagem::new);
        return ResponseEntity.ok(pageCategoria);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosCategoriaListagem> findById(@PathVariable Long id){
        var categoria = categoriaRepository.findById(id).orElse(null);
        return ResponseEntity.ok(new DadosCategoriaListagem(categoria));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosCategoriaListagem> atualizar(@RequestBody @Valid DadosCategoriaAtualizar dadosCategoria){
        var categoria = categoriaRepository.getReferenceById(dadosCategoria.idCategoria());
        categoria.atualizarCategoria(dadosCategoria);
        return ResponseEntity.ok(new DadosCategoriaListagem(categoria));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        categoriaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
