import { Button, Grid } from "@mui/material";
import { Filtro } from "types/filtro";

interface Props {
  filtro: number | null;
  setFiltro: React.Dispatch<React.SetStateAction<number | null>>;
}

const pages: Filtro[] = [{ id: 1, nome: "Lazer" }, { id: 2, nome: "Shows" }, { id: 3, nome: "Eventos" }, { id: 4, nome: "Concursos" }];
function Filtros({ filtro, setFiltro }: Props) {

  function selecionar(filtroSecionado: Filtro) {
    if (filtro === filtroSecionado.id) {
      setFiltro(0);
    } else {
      setFiltro(filtroSecionado.id);
    }
  }

  return (
    <Grid container
      width="100%"
      height="3rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="2rem"
      boxShadow="rgb(99, 99, 99, 0.5) 0px 0px 25px 0px"
      sx={{ backgroundColor: "#e1e1e4" }}
    >
      {pages.map((page) => (
        <Grid item key={page.id} xs={6} md={3} >
          <Button
            sx={{
              backgroundColor: filtro === page.id ? "#eb540f" : "transparent",
              margin: "0 1rem",
              color: "#287881",
              display: "block",
              border: "none",
              fontWeight: "700",
              fontSize: "24px",
            }}
            onClick={() => selecionar(page)}
          >
            {page.nome}
          </Button>
        </Grid>
      ))
      }
    </Grid >
  );
}

export default Filtros;