import { Container, Grid, TextField, Typography } from "@mui/material";
import { IViajante } from "types/viajantes";


interface Props {
  viajantes: IViajante[];
  setViajantes: React.Dispatch<React.SetStateAction<IViajante[]>>;
  qtde: number;
}

function FormugalarioViajantes({ viajantes, setViajantes, qtde }: Props) {
  const atualizarNomeViajante = (index: number, nome: string) => {
    const novosViajantes = [...viajantes];
    novosViajantes[index] = { ...novosViajantes[index], nomeViajante: nome };
    setViajantes(novosViajantes);
  };

  const atualizarDocumentoViajante = (index: number, documento: string) => {
    const novosViajantes = [...viajantes];
    novosViajantes[index] = { ...novosViajantes[index], documentoViajante: documento };
    setViajantes(novosViajantes);
  };

  return (
    <Container>
      {Array.from({ length: qtde }).map((_, i) => (
        <Grid item container
          key={i}
          padding={"0.2rem 0rem"}
          maxWidth="100%"
          sx={{
          }}
        >
          <Grid item xs={12}>
            <Typography>Dados Viajante {i + 1}:</Typography>
          </Grid>
          <Grid item xs={9} width={"100%"} paddingRight={1}>
            <TextField
              size="small"
              required
              label="Nome Completo"
              value={viajantes[i]?.nomeViajante || ""}
              onChange={(e) => atualizarNomeViajante(i, e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              required
              label="Documento"
              value={viajantes[i]?.documentoViajante || ""}
              onChange={(e) => atualizarDocumentoViajante(i, e.target.value)} />
          </Grid>
        </Grid>
      ))
      }
    </Container >
  );
}

export default FormugalarioViajantes;