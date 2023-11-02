package tcc.goexcursao.apiGoExcursao.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais.*;
import tcc.goexcursao.apiGoExcursao.domain.excursao.DadosExcursaoListagem;
import tcc.goexcursao.apiGoExcursao.domain.usuario.*;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.util.List;

@RestController
@RequestMapping("usuario")
//@SecurityRequirement(name = "bearer-key")
public class UsuarioController {
    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosUsuarioListagem> cadastrar(@RequestBody @Valid DadosUsuario dadosUsuario, UriComponentsBuilder uriBuilder){
        var senhaCodificada = passwordEncoder.encode(dadosUsuario.senhaUsuario());
        var usuarioExiste = repository.existsByLoginUsuario(dadosUsuario.loginUsuario());
        if (usuarioExiste){
            throw new ValidacaoException("Login de usuário já cadastrado, favor verificar!");
        }
        var usuario = new Usuario(dadosUsuario.loginUsuario(), senhaCodificada, dadosUsuario.ativoUsuario());
       repository.save(usuario);
        var uri = uriBuilder.path("/Usuario/{login}").buildAndExpand(usuario.getLoginUsuario()).toUri();
        return ResponseEntity.created(uri).body(new DadosUsuarioListagem(usuario));
    }

    //Consulta todos dados de uma unica vez sem nenhum filtro nem paginação
    //@Secured("ROLE_ADMIN") Caso queira utilizar autorização por perfil de usuarios
    @GetMapping
    public ResponseEntity<List<DadosUsuarioListagem>> listar(){
        var usuario = repository.findAll().stream().map(DadosUsuarioListagem::new).toList();
        return ResponseEntity.ok(usuario);
    }
    //stream -> faz a coversão dos dados, utilizando o .map para fazer o mapeamento de como deve ser o retorno de acordo com o DTO utiliziado
    //Para que funcione corretamente deve ser criado um construtor instanciando os dados da classe DadosCadastrais para o record pois a interface JPA só reconhece o objeto usuário

    //Consulta os dados pagina por pagina
    @GetMapping("/listarTodos")
    public ResponseEntity<Page<DadosUsuarioListagem>> listar(@PageableDefault(size=10, sort = {"loginUsuario"}) Pageable paginacao){
       var pageUsarios = repository.findAll(paginacao).map(DadosUsuarioListagem::new);
        return ResponseEntity.ok(pageUsarios);
    }

    //Consulta somente os ativos
    @GetMapping("/listaAtivos")
    public ResponseEntity<Page<DadosUsuarioListagem>> listarAtivos(@PageableDefault(size  =10, sort = {"loginUsuario"}) Pageable paginacao){
        var pageUsuario = repository.findAllByAtivoUsuarioTrue(paginacao).map(DadosUsuarioListagem::new);
        return ResponseEntity.ok(pageUsuario);
    }

    //Consulta somente os ativos
    @GetMapping("/listaInativos")
    public ResponseEntity<Page<DadosUsuarioListagem>> listarInativos(@PageableDefault(size  =10, sort = {"loginUsuario"}) Pageable paginacao){
        var pageUsuario = repository.findAllByAtivoUsuarioFalse(paginacao).map(DadosUsuarioListagem::new);
        return ResponseEntity.ok(pageUsuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosUsuarioListagem> findById(@PathVariable Long id){
        var usuario = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosUsuarioListagem(usuario));
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosUsuarioListagem> atualizar(@RequestBody @Valid DadosUsuarioAtualizar dadosUsuarioAtualizar){
        var usuario = repository.getReferenceById(dadosUsuarioAtualizar.idUsuario());
        usuario.atualizarInformacoes(dadosUsuarioAtualizar);
        return ResponseEntity.ok(new DadosUsuarioListagem(usuario));
    }

    @PutMapping("/atualizarSenha")
    @Transactional
    public ResponseEntity<DadosUsuarioListagem> atualizarSenha(@RequestBody @Valid DadosUsuarioAtualizar dadosUsuarioAtualizar){
        var usuario = repository.getReferenceById(dadosUsuarioAtualizar.idUsuario());
        var senhaCodificada = passwordEncoder.encode(dadosUsuarioAtualizar.senhaUsuario());
        usuario.atualizarSenha(senhaCodificada);
        return ResponseEntity.ok(new DadosUsuarioListagem(usuario));
    }
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id){
        var usuario = repository.getReferenceById(id);
        usuario.excluir();
        return ResponseEntity.noContent().build();
    }
}
