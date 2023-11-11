import { Grid, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { ICategoria } from "types/categoria";
interface Props {
  filtro: string;
  categorias: ICategoria[];
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
}

function Filtros({ filtro, categorias, setFiltro }: Props) {

  return (
    <Grid container
      width="100%"
      height="3rem"
      marginTop="2rem"
      alignItems="center"
      justifySelf="flex-start"
      boxShadow="rgb(99, 99, 99, 0.5) 0px 0px 25px 0px"
      sx={{ backgroundColor: "#e1e1e4" }}
    >

      <Grid item xs={2} sm={1} width="auto" textAlign="end" padding="0 0.5rem">
        <Typography variant="body1">Categoria:</Typography>
      </Grid>
      <Grid item xs={5} sm={2} flex={1}>
        <Select fullWidth size="small" onChange={(event) => setFiltro(event.target.value)} value={filtro}>
          <MenuItem value={"Todos"}>Todos</MenuItem>
          {categorias.map((item) =>
            <MenuItem
              key={item.idCategoria}
              value={item.descricaoCategoria}
            >
              {item.descricaoCategoria}
            </MenuItem>
          )}
        </Select>
      </Grid>
    </Grid >
  );
}

export default Filtros;