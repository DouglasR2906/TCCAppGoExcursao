import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { IExcursao } from "types/excursao";
import CardExcursao from "../Card/cardExcursao";

interface Props {
  excursoes: IExcursao[];
  filtro: string;
  selecionarExcursao: (idSelecionada: number) => void;
  totalPaginas: number;
  onPageChange: (novaPagina: number) => void;
}
function ExcursoesLista({ excursoes, filtro, selecionarExcursao }: Props) {
  const [itensExibidos, setItensExibidos] = useState<number>(1); // Número inicial de itens exibidos

  const handleCarregarMais = () => {
    const novosItensExibidos = itensExibidos + 10; // Adicione 10 itens a mais ao clicar em "Carregar Mais"
    setItensExibidos(novosItensExibidos);
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "0.5rem", padding: "1.5rem", justifyContent: "center" }}>

      {excursoes && excursoes.map((excursao) => {
        return (
          ((filtro !== "Todos" && filtro === excursao.categoriaExcursao) || filtro === "Todos")
          &&
          <Grid item key={excursao.idExcursao} height={"100%"} xs={12} sm={6} md={4} lg={3}>
            <CardExcursao excursao={excursao} selecionarExcursao={selecionarExcursao} />
          </Grid>
        );
      })}
      <Grid item xs={12} textAlign="center">
        {itensExibidos < excursoes.length && (
          <Button variant="text" onClick={handleCarregarMais}>
            Carregar Mais
          </Button>
        )}
        {/* <span style={{ margin: "0 1rem" }}>1-{Math.min(itensExibidos, excursoes.length)} de {excursoes.length}</span> */}
      </Grid>
    </Grid>
  );
}

export default ExcursoesLista;

