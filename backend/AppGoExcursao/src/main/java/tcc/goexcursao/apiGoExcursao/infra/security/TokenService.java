package tcc.goexcursao.apiGoExcursao.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tcc.goexcursao.apiGoExcursao.domain.usuario.Usuario;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Usuario usuario){
        try {
            var algoritimo = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("API goExcursao")
                    .withSubject(usuario.getLoginUsuario())
                    .withClaim("id",usuario.getIdUsuario())
                    .withExpiresAt(dataExpiracao())
                    .sign(algoritimo);
        } catch (JWTCreationException exception){
            throw new RuntimeException("erro ao gerar token jwt:",exception);
        }
    }

    public String getSubject(String tokenJWT){
        try {
            var algoritimo = Algorithm.HMAC256(secret);
            return JWT.require(algoritimo)
                    .withIssuer("API goExcursao")
                    .build()
                    .verify(tokenJWT)
                    .getSubject();
        } catch (JWTCreationException exception){
            throw new RuntimeException("Token JWT inválido ou expirado!",exception);
        }
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
