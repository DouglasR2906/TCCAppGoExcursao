package tcc.goexcursao.apiGoExcursao.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;
import tcc.goexcursao.apiGoExcursao.domain.categoria.CategoriaRepository;
import tcc.goexcursao.apiGoExcursao.domain.excursao.*;
import tcc.goexcursao.apiGoExcursao.domain.formaPagamento.FormaPagamentoRepository;
import tcc.goexcursao.apiGoExcursao.domain.excursao.DadosFormaPagtoExcursao;
import tcc.goexcursao.apiGoExcursao.domain.excursao.DadosFormaPagtoExcursaoListagem;
import tcc.goexcursao.apiGoExcursao.domain.usuario.UsuarioRepository;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("excursao")
@SecurityRequirement(name = "bearer-key")
public class ExcursaoController {

    @Autowired
    private ExcursaoRepository excursaoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;
    @Autowired
    private ExcursaoService excursaoService;
    @Autowired
    TradorDeErros tradorDeErros;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosExcursaoListagem> cadastrar(@RequestBody @Valid DadosExcursao dadosExcursao, UriComponentsBuilder uriBuilder) {
        var excursao = excursaoService.cadastrar(dadosExcursao);
        var uri = uriBuilder.path("/excursao/{id}").buildAndExpand(excursao.getIdExcursao()).toUri();
        return ResponseEntity.created(uri).body(new DadosExcursaoListagem(excursao));
    }

    @PostMapping(value = "/upload/imagens/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadImage(@RequestPart MultipartFile imagem, @PathVariable Long id) {
        var excursao = excursaoRepository.getReferenceById(id);
        if (excursao != null){
            try {
                excursaoService.UploadImagem(imagem, excursao.getIdExcursao());
                return ResponseEntity.ok("Imagem enviada com sucesso.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao fazer o upload da imagem.");
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Excursao não encontrada.");
    }

    @GetMapping("/imagens/{id}")
    public ResponseEntity<Object> listaImagens(@PathVariable Long id) {
        Excursao excursao = excursaoRepository.findById(id).orElse(null);
        if (excursao != null){
            try {
                var listaImagens = excursaoService.listaImagens(excursao);
                System.out.println(listaImagens);
                return ResponseEntity.ok(listaImagens);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao fazer o upload da imagem.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Excursao não encontrada.");
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Page<DadosExcursaoListagem>> listarByUsuario(@PathVariable Long id, @PageableDefault(size  =10, sort = {"tituloExcursao"}) Pageable paginacao){
        var usuario = usuarioRepository.getReferenceById(id);
        var pageExcursoes = excursaoRepository.findAllByUsuario(usuario, paginacao).map(DadosExcursaoListagem::new);
        return ResponseEntity.ok(pageExcursoes);
    }
    @GetMapping
    public ResponseEntity<Page<DadosExcursaoListagem>> listar(@PageableDefault(size  = 10, sort = {"tituloExcursao"}) Pageable paginacao){
        var pageExcursoes = excursaoRepository.findAllByCanceladaExcursaoFalse(paginacao).map(DadosExcursaoListagem::new);
        return ResponseEntity.ok(pageExcursoes);
    }

    @GetMapping("/buscarFiltros")
    public ResponseEntity<Page<DadosExcursaoListagem>> buscaByFiltros(
            @PageableDefault(size  = 1, sort = {"tituloExcursao"}) Pageable paginacao,
            @RequestParam(required = false) String cidadeDestino,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal
    ){
        Page<DadosExcursaoListagem> pageExcursoes = excursaoService.buscarByFiltros(paginacao, cidadeDestino, dataInicial, dataFinal);
        return ResponseEntity.ok(pageExcursoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosExcursaoListagem> findById(@PathVariable Long id){
        var excursao = excursaoRepository.getReferenceById(id);
        return ResponseEntity.ok(new DadosExcursaoListagem(excursao));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosExcursaoListagem> atualizar(@RequestBody @Valid DadosExcursaoAtualizar dadosExcursao){
        var excursao = excursaoRepository.getReferenceById(dadosExcursao.idExcursao());
        excursao.atualizarInformacoes(dadosExcursao);
        return ResponseEntity.ok(new DadosExcursaoListagem(excursao));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        var excursao = excursaoRepository.getReferenceById(id);
        excursao.excluir();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addFormaPagtoExcursao")
    @Transactional
    public ResponseEntity<DadosFormaPagtoExcursaoListagem> addFormaPagamento(@RequestBody @Valid DadosFormaPagtoExcursao formaPagtoexcursao){
        var excursao = excursaoRepository.findById(formaPagtoexcursao.idExcursao()).orElse(null);
        var formaPagamento = formaPagamentoRepository.findById(formaPagtoexcursao.idFormaPagto()).orElse(null);

        if (excursao == null){
            throw new ValidacaoException("Excursão informada não encontrada!");
        }

        if (formaPagamento == null){
            throw new ValidacaoException("Forma de pagamento informada não encontrada!");
        }
        excursao.getFormasPagamento().add(formaPagamento);
        excursaoRepository.save(excursao);

        return ResponseEntity.ok(new DadosFormaPagtoExcursaoListagem(excursao,formaPagamento));
    }

    @GetMapping("/{id}/formasPagtoExcursao")
    public ResponseEntity<List<DadosFormaPagtoExcursaoListagem>> listarFormasPagto(@PathVariable Long id){
        var excursao = excursaoRepository.findById(id).orElse(null);
        if (excursao == null){
            throw new ValidacaoException("Excursão não encontrada!");
        }
        List<DadosFormaPagtoExcursaoListagem> formasPagto = excursao.getFormasPagamento()
                .stream()
                .map(formaPagamento -> new DadosFormaPagtoExcursaoListagem(excursao, formaPagamento))
                .collect(Collectors.toList());
        return ResponseEntity.ok(formasPagto);
    }

}
