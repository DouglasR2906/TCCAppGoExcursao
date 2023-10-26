import { Grid } from "@mui/material";
import http from "http/http";
import { useEffect, useState } from "react";
import { Excursao } from "../../../types/excursao";
import CardExcursao from "../Card/cardExcursao";
import Filtros from "../Filtros/filtros";

interface Props {
  excursoes: Excursao[]
  selecionarExcursao: (excursaoSelecionada: Excursao) => void
}
function ExcursoesLista({ excursoes, selecionarExcursao }: Props) {
  const [filtro, setFiltro] = useState<number | null>(null);

  useEffect(() => {
    http.get("excursao/listarTodas")
      .then(reposta => {
        console.log(reposta);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);

  return (
    <>
      <Filtros filtro={filtro} setFiltro={setFiltro} />
      <Grid container spacing={2} style={{ marginTop: "0.5rem", padding: "1.5rem", justifyContent: "center" }}>
        {excursoes.map((excursao) => (
          <Grid item key={excursao.idExcursao} height={"100%"} xs={12} sm={6} md={4} lg={3}>
            <CardExcursao excursao={excursao} selecionarExcursao={selecionarExcursao} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ExcursoesLista;