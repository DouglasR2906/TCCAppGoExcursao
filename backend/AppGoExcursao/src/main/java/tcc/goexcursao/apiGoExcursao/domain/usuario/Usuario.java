package tcc.goexcursao.apiGoExcursao.domain.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tcc.goexcursao.apiGoExcursao.domain.dadosCadastrais.DadosCadastrais;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Table(name= "usuarios")
@Entity(name = "Usuario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idUsuario")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuarios")
    private Long idUsuario;
    @Column(name = "login_usuarios")
    private String loginUsuario;
    @Column(name = "senha_usuarios")
    private String senhaUsuario;
    @Column(name = "ativo_usuarios")
    private Boolean ativoUsuario;
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario")
    private TipoUsuario tipoUsuario;

    @OneToOne
    @JoinColumn(name = "id_dadoscadastrais_usuarios")
    private DadosCadastrais dadosCadastraisUsuario;


    public Usuario(DadosUsuario dadosUsuario){
        this.loginUsuario = dadosUsuario.loginUsuario();
        this.senhaUsuario = dadosUsuario.senhaUsuario();
        this.ativoUsuario = dadosUsuario.ativoUsuario();
        this.tipoUsuario = dadosUsuario.tipoUsuario();
    }

    public Usuario(String loginUsuario, String senhaCodificada, Boolean ativoUsuario, TipoUsuario tipoUsuario) {
        this.loginUsuario = loginUsuario;
        this.senhaUsuario = senhaCodificada;
        this.ativoUsuario = ativoUsuario;
        this.tipoUsuario = tipoUsuario;
    }

    public void atualizarInformacoes(DadosUsuarioAtualizar dadosUsuario) {
        if (dadosUsuario.loginUsuario() != null){
            this.loginUsuario = dadosUsuario.loginUsuario();
        }
        if (dadosUsuario.ativoUsuario() != null){
            this.ativoUsuario = dadosUsuario.ativoUsuario();
        }
        if (dadosUsuario.tipoUsuario() != null){
            this.tipoUsuario = dadosUsuario.tipoUsuario();
        }
    }

    public void atualizarSenha(String senhaCodificada) {
        if (senhaCodificada != null){
            this.senhaUsuario = senhaCodificada;
        }
    }

    public void excluir() {
        this.ativoUsuario = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        List<GrantedAuthority> authorities = new ArrayList<>();

        switch (tipoUsuario) {
            case ADMIN:
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                break;
            case CLIENTE:
                authorities.add(new SimpleGrantedAuthority("ROLE_CLIENTE"));
                break;
            case ORGANIZADOR:
                authorities.add(new SimpleGrantedAuthority("ROLE_ORGANIZADOR"));
                break;
            default:
                authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                break;
        }

        return  authorities;
    }

    @Override
    public String getPassword() {
        return senhaUsuario;
    }

    @Override
    public String getUsername() {
        return loginUsuario;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return ativoUsuario;
    }
}