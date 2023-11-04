package tcc.goexcursao.apiGoExcursao.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais.DadosCadastrais;
import tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais.DadosCadastraisRepository;
import tcc.goexcursao.apiGoExcursao.domain.usuario.DadosAutenticacao;
import tcc.goexcursao.apiGoExcursao.domain.usuario.DadosUsuario;
import tcc.goexcursao.apiGoExcursao.domain.usuario.RespostaAutenticacao;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;
import tcc.goexcursao.apiGoExcursao.infra.security.DadosTokenJWT;
import tcc.goexcursao.apiGoExcursao.infra.security.TokenService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("login")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private DadosCadastraisRepository dadosCadastraisRepository;

    @PostMapping
    public ResponseEntity login(@RequestBody @Valid DadosAutenticacao dados) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        var authentication = manager.authenticate(authenticationToken);

        var usuarioAutenticado = (Usuario) authentication.getPrincipal();
        var tokenJWT = tokenService.gerarToken(usuarioAutenticado);
        var dadosUsuario = dadosCadastraisRepository.findByUsuario(usuarioAutenticado);

        RespostaAutenticacao resposta = new RespostaAutenticacao();
        resposta.setIdUsuario(usuarioAutenticado.getIdUsuario());
        resposta.setLoginUsuario(usuarioAutenticado.getLoginUsuario());
        resposta.setTokenUsuario(tokenJWT);
        resposta.setTipoUsuario(usuarioAutenticado.getTipoUsuario());
        if (dadosUsuario != null){
            resposta.setNomeUsuario(dadosUsuario.getNomeDadosCadastrais());
        }
        return ResponseEntity.ok(resposta);
    }
}
