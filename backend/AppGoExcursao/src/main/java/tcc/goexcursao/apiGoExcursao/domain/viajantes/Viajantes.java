package tcc.goexcursao.apiGoExcursao.domain.viajantes;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.aop.framework.AopProxyFactory;
import tcc.goexcursao.apiGoExcursao.domain.reserva.Reserva;

@Entity(name = "Viajantes")
@Table(name = "viajantes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idViajantes")
public class Viajantes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_viajantes")
    private Long idViajantes;

    @ManyToOne
    @JoinColumn(name = "id_reserva_viajantes")
    private Reserva reserva;

    private String nomeViajantes;

    private String documentoViajantes;

    public Viajantes(DadosViajantes dadosViajantes){
        this.nomeViajantes = dadosViajantes.nomeViajantes();
        this.documentoViajantes = dadosViajantes.documentoViajantes();
    }

    public Viajantes(DadosViajantesReserva dadosViajantesReserva){
        this.nomeViajantes = dadosViajantesReserva.nomeViajantes();
        this.documentoViajantes = dadosViajantesReserva.documentoViajantes();
    }

    public void atualizarViajante(DadosViajantesAtualizar dadosViajantesAtualizar){
        if (dadosViajantesAtualizar.nomeViajantes() != null){
            this.nomeViajantes = dadosViajantesAtualizar.nomeViajantes();
        }

        if (dadosViajantesAtualizar.documentoViajantes() != null){
            this.documentoViajantes = dadosViajantesAtualizar.documentoViajantes();
        }
    }

}
