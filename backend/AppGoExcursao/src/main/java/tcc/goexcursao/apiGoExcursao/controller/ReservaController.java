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
import tcc.goexcursao.apiGoExcursao.domain.reserva.*;
import tcc.goexcursao.apiGoExcursao.domain.usuario.UsuarioRepository;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.util.List;

@RestController
@RequestMapping("reserva")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private ExcrusaoRepository excrusaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    TradorDeErros tradorDeErros;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosReservaListagem> cadastrar(@RequestBody @Valid DadosReserva dadosReserva, UriComponentsBuilder uriBuilder) {
        var usuario = usuarioRepository.findById(dadosReserva.idUsuarioReserva()).orElse(null);
        var excursao = excrusaoRepository.findById(dadosReserva.idExcursaoReserva()).orElse(null);

        Reserva reserva = null;
        if (usuario != null && excursao != null) {
            reserva = new Reserva(dadosReserva);
            //reserva.setDivulgador(usuario);
            reserva.setExcursao(excursao);
            reservaRepository.save(reserva);
        }else {
            tradorDeErros.tratarErro404();
            throw new ValidacaoException("Usuário/Excursão informado não encontrado!");
        }

        var uri = uriBuilder.path("/excursao/{id}").buildAndExpand(reserva.getIdReserva()).toUri();
        return ResponseEntity.created(uri).body(new DadosReservaListagem(reserva));
    }

    @GetMapping
    public ResponseEntity<List<DadosReservaListagem>> listar(){
        var reservas = reservaRepository.findAll().stream().map(DadosReservaListagem::new).toList();
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/listarTodas")
    public ResponseEntity<Page<DadosReservaListagem>> listar(@PageableDefault(size  =10, sort = {"tituloExcursao"}) Pageable paginacao){
        var pageReservas = reservaRepository.findAll(paginacao).map(DadosReservaListagem::new);
        return ResponseEntity.ok(pageReservas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosReservaListagem> findById(@PathVariable Long id){
        var reserva = reservaRepository.getReferenceById(id);
        return ResponseEntity.ok(new DadosReservaListagem(reserva));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosReservaListagem> atualizar(@RequestBody @Valid DadosReservaAtualizar dadosReserva){
        var reserva = reservaRepository.getReferenceById(dadosReserva.idReserva());
        reserva.atualizarReserva(dadosReserva);
        return ResponseEntity.ok(new DadosReservaListagem(reserva));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        reservaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
