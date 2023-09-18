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
import tcc.goexcursao.apiGoExcursao.domain.categoria.CategoriaRepository;
import tcc.goexcursao.apiGoExcursao.domain.excursao.*;
import tcc.goexcursao.apiGoExcursao.domain.formaPagamento.FormaPagamentoRepository;
import tcc.goexcursao.apiGoExcursao.domain.excursao.DadosFormaPagtoExcursao;
import tcc.goexcursao.apiGoExcursao.domain.excursao.DadosFormaPagtoExcursaoListagem;
import tcc.goexcursao.apiGoExcursao.domain.usuario.UsuarioRepository;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("excursao")
@SecurityRequirement(name = "bearer-key")
public class ExcursaoController {

    @Autowired
    private ExcrusaoRepository excrusaoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    @Autowired
    TradorDeErros tradorDeErros;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosExcursaoListagem> cadastrar(@RequestBody @Valid DadosExcursao dadosExcursao, UriComponentsBuilder uriBuilder) {
        var usuario = usuarioRepository.findById(dadosExcursao.idUsuarioExcursao()).orElse(null);
        var categoria = categoriaRepository.findById(dadosExcursao.idCategoriaExcursao()).orElse(null);

        if (usuario == null && !usuario.getAtivoUsuario()) {
            throw new ValidacaoException("Usuário informado não encontrado ou inativo!");
        }

        if (categoria == null){
            throw new ValidacaoException("Categoria informada não encontrado!");
        }

        var excursao = new Excursao(dadosExcursao);
        excursao.setUsuario(usuario);
        excursao.setCategoria(categoria);
        excrusaoRepository.save(excursao);

        var uri = uriBuilder.path("/excursao/{id}").buildAndExpand(excursao.getIdExcursao()).toUri();
        return ResponseEntity.created(uri).body(new DadosExcursaoListagem(excursao));
    }

    @GetMapping
    public ResponseEntity<List<DadosExcursaoListagem>> listar(){
        var excursoes = excrusaoRepository.findAll().stream().map(DadosExcursaoListagem::new).toList();
        return ResponseEntity.ok(excursoes);
    }

    @GetMapping("/listarTodas")
    public ResponseEntity<Page<DadosExcursaoListagem>> listar(@PageableDefault(size  =10, sort = {"tituloExcursao"}) Pageable paginacao){
        var pageExcursoes = excrusaoRepository.findAll(paginacao).map(DadosExcursaoListagem::new);
        return ResponseEntity.ok(pageExcursoes);
    }

    @GetMapping("/listarCanceladas")
    public ResponseEntity<Page<DadosExcursaoListagem>> listarCanceladas(@PageableDefault(size  =10, sort = {"tituloExcursao"}) Pageable paginacao){
        var pageExcursoes = excrusaoRepository.findAllByCanceladaExcursaoTrue(paginacao).map(DadosExcursaoListagem::new);
        return ResponseEntity.ok(pageExcursoes);
    }

    @GetMapping("/listarAtivas")
    public ResponseEntity<Page<DadosExcursaoListagem>> listarAtivas(@PageableDefault(size  =10, sort = {"tituloExcursao"}) Pageable paginacao){
        var pageExcursoes =  excrusaoRepository.findAllByCanceladaExcursaoFalse(paginacao).map(DadosExcursaoListagem::new);
        return ResponseEntity.ok(pageExcursoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosExcursaoListagem> findById(@PathVariable Long id){
        var excursao = excrusaoRepository.getReferenceById(id);
        return ResponseEntity.ok(new DadosExcursaoListagem(excursao));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosExcursaoListagem> atualizar(@RequestBody @Valid DadosExcursaoAtualizar dadosExcursao){
        var excursao = excrusaoRepository.getReferenceById(dadosExcursao.idExcursao());
        excursao.atualizarInformacoes(dadosExcursao);
        return ResponseEntity.ok(new DadosExcursaoListagem(excursao));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        var excursao = excrusaoRepository.getReferenceById(id);
        excursao.excluir();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addFormaPagtoExcursao")
    @Transactional
    public ResponseEntity<DadosFormaPagtoExcursaoListagem> addFormaPagamento(@RequestBody @Valid DadosFormaPagtoExcursao formaPagtoexcursao){
        var excursao = excrusaoRepository.findById(formaPagtoexcursao.idExcursao()).orElse(null);
        var formaPagamento = formaPagamentoRepository.findById(formaPagtoexcursao.idFormaPagto()).orElse(null);

        if (excursao == null){
            throw new ValidacaoException("Excursão informada não encontrada!");
        }

        if (formaPagamento == null){
            throw new ValidacaoException("Forma de pagamento informada não encontrada!");
        }
        excursao.getFormasPagamento().add(formaPagamento);
        excrusaoRepository.save(excursao);

        return ResponseEntity.ok(new DadosFormaPagtoExcursaoListagem(excursao,formaPagamento));
    }

    @GetMapping("/{id}/formasPagtoExcursao")
    public ResponseEntity<List<DadosFormaPagtoExcursaoListagem>> listarFormasPagto(@PathVariable Long id){
        var excursao = excrusaoRepository.findById(id).orElse(null);

        if (excursao == null){
            throw new ValidacaoException("Excursão não encontrada!");
        }

        List<DadosFormaPagtoExcursaoListagem> formasPagto = excursao.getFormasPagamento()
                .stream()
                .map(formaPagamento -> new DadosFormaPagtoExcursaoListagem(excursao, formaPagamento))
                .collect(Collectors.toList());

        System.out.println(formasPagto);

        return ResponseEntity.ok(formasPagto);
    }

}
