package tcc.goexcursao.apiGoExcursao.domain.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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

    
    public Usuario(DadosUsuario dadosUsuario){
        this.loginUsuario = dadosUsuario.loginUsuario();
        this.senhaUsuario = dadosUsuario.senhaUsuario();
        this.ativoUsuario = dadosUsuario.ativoUsuario();
    }

    public Usuario(String loginUsuario, String senhaCodificada, Boolean ativoUsuario) {
        this.loginUsuario = loginUsuario;
        this.senhaUsuario = senhaCodificada;
        this.ativoUsuario = ativoUsuario;
    }

    public void atualizarInformacoes(DadosUsuarioAtualizar dadosUsuario) {
        if (dadosUsuario.loginUsuario() != null){
            this.loginUsuario = dadosUsuario.loginUsuario();
        }
        if (dadosUsuario.senhaUsuario() != null){
            this.senhaUsuario = dadosUsuario.senhaUsuario();
        }
        if (dadosUsuario.ativoUsuario() != null){
            this.ativoUsuario = dadosUsuario.ativoUsuario();
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
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        /*List<GrantedAuthority> authorities = new ArrayList<>();
        Caso eu queira utilizar uma validação de permissão por tipo de perfil
        e utilizar uma enum para o tipo de usuario
        public enum TipoUsuario {
            ADMIN,
            CLIENTE,
            DIVULGADOR
        }
        @Enumerated(EnumType.STRING)
        @Column(name = "tipoUsuario", length = 20) // Defina o tamanho adequado para o seu caso
        private TipoUsuario tipoUsuario;

        switch (tipoUsuario) {
            case ADMIN:
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                break;
            case CLIENTE:
                authorities.add(new SimpleGrantedAuthority("ROLE_CLIENTE"));
                break;
            case DIVULGADOR:
                authorities.add(new SimpleGrantedAuthority("ROLE_DIVULGADOR"));
                break;
            default:
                authorities.add(new SimpleGrantedAuthority("ROLE_USUARIO"));
                break;
        }*/
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