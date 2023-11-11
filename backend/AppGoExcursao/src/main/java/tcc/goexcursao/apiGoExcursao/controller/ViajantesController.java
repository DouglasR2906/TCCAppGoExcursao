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
import tcc.goexcursao.apiGoExcursao.domain.reserva.ReservaRepository;
import tcc.goexcursao.apiGoExcursao.domain.viajantes.*;
import tcc.goexcursao.apiGoExcursao.infra.exception.TradorDeErros;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.util.List;

@RestController
@RequestMapping("viajantes")
@SecurityRequirement(name = "bearer-key")
public class ViajantesController {

    @Autowired
    private ViajantesRepository viajantesRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosViajantesListagem> cadastrar(@RequestBody @Valid DadosViajantes dados, UriComponentsBuilder uriBuilder) {
        var viajantes =  new Viajantes(dados);
        var reserva = reservaRepository.getReferenceById(dados.idReservaViajantes());

        if (reserva == null){
            throw new ValidacaoException("Reserva não cadastrada!");
        }

        viajantes.setReserva(reserva);
        viajantesRepository.save(viajantes);
        var uri = uriBuilder.path("/viajantes/{id}").buildAndExpand(viajantes.getIdViajantes()).toUri();
        return ResponseEntity.created(uri).body(new DadosViajantesListagem(viajantes));
    }

    @GetMapping
    public ResponseEntity<List<DadosViajantesListagem>> listar(){
        var categoria = viajantesRepository.findAll().stream().map(DadosViajantesListagem::new).toList();
        return ResponseEntity.ok(categoria);
    }

    @GetMapping("/listarTodas")
    public ResponseEntity<Page<DadosViajantesListagem>> listar(@PageableDefault(size  =10, sort = {"descricaCategoria"}) Pageable paginacao){
        var pageCategoria = viajantesRepository.findAll(paginacao).map(DadosViajantesListagem::new);
        return ResponseEntity.ok(pageCategoria);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosViajantesListagem> findById(@PathVariable Long id){
        var categoria = viajantesRepository.findById(id).orElse(null);
        return ResponseEntity.ok(new DadosViajantesListagem(categoria));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosViajantesListagem> atualizar(@RequestBody @Valid DadosViajantesAtualizar dadosViajante){
        var viajantes = viajantesRepository.getReferenceById(dadosViajante.idViajantes());
        viajantes.atualizarViajante(dadosViajante);
        return ResponseEntity.ok(new DadosViajantesListagem(viajantes));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        viajantesRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
