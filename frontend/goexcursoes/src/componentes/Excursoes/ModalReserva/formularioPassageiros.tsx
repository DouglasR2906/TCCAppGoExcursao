import { Container, Grid, TextField, Typography } from "@mui/material";
import ReactInputMask from "react-input-mask";
import { IViajante } from "types/viajantes";


interface Props {
  viajantes: IViajante[];
  setViajantes: React.Dispatch<React.SetStateAction<IViajante[]>>;
  qtde: number;
}

function FormugalarioViajantes({ viajantes, setViajantes, qtde }: Props) {
  const atualizarNomeViajante = (index: number, nome: string) => {
    const novosViajantes = [...viajantes];
    novosViajantes[index] = { ...novosViajantes[index], nomeViajantes: nome };
    setViajantes(novosViajantes);
  };

  const atualizarDocumentoViajante = (index: number, documento: string) => {
    const novosViajantes = [...viajantes];
    novosViajantes[index] = { ...novosViajantes[index], documentoViajantes: documento };
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
              value={viajantes[i]?.nomeViajantes || ""}
              onChange={(e) => atualizarNomeViajante(i, e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={3}>
            <ReactInputMask
              mask="999.999.999-99"
              value={viajantes[i]?.documentoViajantes || ""}
              onChange={(event) => atualizarDocumentoViajante(i, event.target.value)}
            >
              <TextField
                size="small"
                required
                label="Documento"
              />
            </ReactInputMask>
          </Grid>
        </Grid>
      ))
      }
    </Container >
  );
}

export default FormugalarioViajantes;