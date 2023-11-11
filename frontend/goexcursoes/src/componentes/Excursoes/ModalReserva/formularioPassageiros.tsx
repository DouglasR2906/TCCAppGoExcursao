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
    novosViajantes[index] = { ...novosViajantes[index], documentoViajantes: documento.replace(/\D/g, "") };
    setViajantes(novosViajantes);
  };

  return (
    <Container sx={{ height: "70vh", overflowY: "auto" }}>
      {Array.from({ length: qtde }).map((_, i) => (
        <Grid container
          key={i}
          maxWidth="100%"
          alignItems="center"
          marginTop={1}
          sx={{
          }}
        >
          <Grid item xs={12}>
            <Typography>Dados Viajante {i + 1}:</Typography>
          </Grid>
          <Grid item xs={12} sm={8} width={"100%"} paddingRight={{ sm: 1 }}>
            <TextField
              size="small"
              fullWidth
              required
              label="Nome Completo"
              value={viajantes[i]?.nomeViajantes || ""}
              onChange={(e) => atualizarNomeViajante(i, e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4} paddingTop={{ xs: 1, sm: 0 }}>
            <ReactInputMask
              mask="999.999.999-99"
              value={viajantes[i]?.documentoViajantes || ""}
              onChange={(event) => atualizarDocumentoViajante(i, event.target.value)}
            >
              <TextField
                size="small"
                fullWidth
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