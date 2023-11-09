import { Grid } from "@mui/material";
import { IExcursao } from "types/excursao";
import CardExcursao from "../Card/cardExcursao";

interface Props {
  excursoes: IExcursao[]
  selecionarExcursao: (idSelecionada: number) => void
}
function ExcursoesLista({ excursoes, selecionarExcursao }: Props) {

  return (
    <Grid container spacing={2} sx={{ marginTop: "0.5rem", padding: "1.5rem", justifyContent: "center" }}>
      {excursoes.map((excursao) => {
        return (
          <Grid item key={excursao.idExcursao} height={"100%"} xs={12} sm={6} md={4} lg={3}>
            <CardExcursao excursao={excursao} selecionarExcursao={selecionarExcursao} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ExcursoesLista;

