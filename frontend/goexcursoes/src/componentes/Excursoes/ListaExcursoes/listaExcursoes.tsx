import { Button, Grid } from "@mui/material";
import { IExcursao } from "types/excursao";
import CardExcursao from "../Card/cardExcursao";

interface Props {
  excursoes: IExcursao[];
  filtro: string;
  paginaAtual: number
  selecionarExcursao: (idSelecionada: number) => void;
  totalPaginas: number;
  onPageChange: () => void;
}
function ExcursoesLista({ excursoes, filtro, paginaAtual, selecionarExcursao, totalPaginas, onPageChange }: Props) {

  const handleCarregarMais = () => {
    onPageChange();
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "0.5rem", padding: "1.5rem", justifyContent: "center" }}>
      {excursoes && excursoes.map((excursao) => {
        return (
          ((filtro !== "Todos" && filtro === excursao.categoriaExcursao.descricaoCategoria) || filtro === "Todos")
          &&
          <Grid item key={excursao.idExcursao} height={"100%"} xs={12} sm={6} md={4} lg={3}>
            <CardExcursao excursao={excursao} selecionarExcursao={selecionarExcursao} />
          </Grid>
        );
      })}
      <Grid item xs={12} textAlign="center" >
        {paginaAtual < (totalPaginas - 1) && (
          <Button variant="text" onClick={handleCarregarMais}>
            Carregar Mais
          </Button>
        )}
        <span style={{ margin: "0 1rem" }}>{paginaAtual + 1} de {totalPaginas}</span>
      </Grid>
    </Grid>
  );
}

export default ExcursoesLista;

