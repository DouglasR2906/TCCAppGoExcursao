import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { ICategoria } from "types/categoria";

interface Props {
  itens: ICategoria[],
  valor: number,
  setValor: React.Dispatch<React.SetStateAction<number>>
}

function ListaSuspensa({ itens, valor, setValor }: Props) {

  return (
    <Grid sx={{ display: "inline-block" }} xs={12}>
      <InputLabel>Filtros</InputLabel>
      <Select onChange={(event) => setValor(Number(event.target.value))} value={valor}>
        {itens.map((item) => <MenuItem key={item.idCategoria} className="option" value={item.idCategoria}>{item.descricaoCategoria}</MenuItem>)}
      </Select>
    </Grid>
  );
}

export default ListaSuspensa;