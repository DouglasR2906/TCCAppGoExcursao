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
import tcc.goexcursao.apiGoExcursao.domain.excursao.*;
import tcc.goexcursao.apiGoExcursao.domain.formaPagamento.FormaPagamentoRepository;
import tcc.goexcursao.apiGoExcursao.domain.reserva.*;
import tcc.goexcursao.apiGoExcursao.domain.usuario.UsuarioRepository;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.DadosViajantesReserva;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.Viajantes;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.ViajantesRepository;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.util.List;

@RestController
@RequestMapping("reserva")
@SecurityRequirement(name = "bearer-key")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private ExcursaoRepository excursaoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ViajantesRepository viajantesRepository;
    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;
    @Autowired
    TradorDeErros tradorDeErros;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosReservaListagem> cadastrar(@RequestBody @Valid DadosReserva dadosReserva, UriComponentsBuilder uriBuilder) {
        var usuario = usuarioRepository.findById(dadosReserva.idUsuarioReserva()).orElse(null);
        var excursao = excursaoRepository.findById(dadosReserva.idExcursaoReserva()).orElse(null);
        var formaPagamento = formaPagamentoRepository.findById(dadosReserva.idFormaPagtoReserva()).orElse(null);
        if (usuario == null){
            throw new ValidacaoException("Usuário informado não encontrado!");
        }

        if (excursao == null){
            throw new ValidacaoException("Excursão informada não encontrada!");
        }

        if (dadosReserva.viajantes() == null){
            throw new ValidacaoException("Viajantes não informados!");
        }

        var reserva = new Reserva(dadosReserva);
        reserva.setDivulgador(usuario);
        reserva.setExcursao(excursao);
        reserva.setFormaPagtoReserva(formaPagamento);
        reservaRepository.save(reserva);

        for (DadosViajantesReserva viajante: dadosReserva.viajantes()) {
            var newViajante =  new Viajantes(viajante);
            newViajante.setReserva(reserva);
            viajantesRepository.save(newViajante);
        }

        var uri = uriBuilder.path("/reserva/{id}").buildAndExpand(reserva.getIdReserva()).toUri();
        return ResponseEntity.created(uri).body(new DadosReservaListagem(reserva));
    }

    @GetMapping
    public ResponseEntity<List<DadosReservaListagem>> listar(){
        var reservas = reservaRepository.findAll().stream().map(DadosReservaListagem::new).toList();
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/listarTodas")
    public ResponseEntity<Page<DadosReservaListagem>> listar(@PageableDefault(size  =10, sort = {"idReserva"}) Pageable paginacao){
        var pageReservas = reservaRepository.findAll(paginacao).map(DadosReservaListagem::new);
        return ResponseEntity.ok(pageReservas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosReservaListagem> findById(@PathVariable Long id){
        var reserva = reservaRepository.getReferenceById(id);
        return ResponseEntity.ok(new DadosReservaListagem(reserva));
    }
    @GetMapping("/usuario/{id}")
    public ResponseEntity<Page<DadosReservaListagem>> listarByUsuario(@PathVariable Long id, @PageableDefault(size  =10, sort = {"idReserva"}) Pageable paginacao){
        var divulgador = usuarioRepository.getReferenceById(id);
        var pageReservas = reservaRepository.findAllByDivulgador(divulgador, paginacao).map(DadosReservaListagem::new);
        return ResponseEntity.ok(pageReservas);
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosReservaListagem> atualizar(@RequestBody @Valid DadosReservaAtualizar dadosReserva){
        var reserva = reservaRepository.getReferenceById(dadosReserva.idReserva());
        reserva.atualizarReserva(dadosReserva);
        return ResponseEntity.ok(new DadosReservaListagem(reserva));
    }

    @PutMapping("/atualizarStatus/{id}")
    @Transactional
    public ResponseEntity<DadosReservaListagem> atualizarStatus(@RequestBody @Valid DadosReservaAtualizar dadosReserva){
        var reserva = reservaRepository.getReferenceById(dadosReserva.idReserva());
        reserva.atualizarStatus(dadosReserva);
        return ResponseEntity.ok(new DadosReservaListagem(reserva));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        reservaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
