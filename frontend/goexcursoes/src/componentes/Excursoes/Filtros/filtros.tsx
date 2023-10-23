import styles from "./Filtros.module.scss";
import { Box, Button } from "@mui/material";
import { Filtro } from "types/filtro";

interface Props {
  filtro: number | null;
  setFiltro: React.Dispatch<React.SetStateAction<number | null>>;
}

const pages: Filtro[] = [{ id: 1, nome: "Lazer" }, { id: 2, nome: "Shows" }, { id: 3, nome: "Eventos" }, { id: 4, nome: "Concursos" }];
function Filtros({ filtro, setFiltro }: Props) {

  function selecionar(filtro: Filtro) {
    if (filtro.id) setFiltro(filtro.id);
  }

  return (
    <Box className={styles.filtros}>
      {pages.map((page) => (
        <button
          className={`${styles.filtros__botao} ${filtro === page.id ? styles.filtros__botao : ""}`}
          key={page.id}
          onClick={() => selecionar(page)}
        >
          {page.nome}
        </button>
      ))
      }
    </Box >
  );
}

export default Filtros;