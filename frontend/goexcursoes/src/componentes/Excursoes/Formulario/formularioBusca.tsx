import { Button, FormGroup, Grid } from "@mui/material";
import AutocompleteComponent from "componentes/Genericos/AutoCompleteMunicipios/autoCompleteMunicipios";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { TipoSnack } from "types/tipoSnack";
import CampoData from "../../Genericos/CampoData/campoData";

interface Props {
  adicionaBusca: (busca: string, dataIda: Dayjs | null, dataVolta: Dayjs | null) => void
}

function Formulario({ adicionaBusca }: Props) {
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [busca, setBusca] = useState("");
  const [dataIda, setDataIda] = useState<Dayjs | null>(dayjs());
  const [dataVolta, setDataVolta] = useState<Dayjs | null>(dayjs());

  const aoBuscar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    adicionaBusca(busca, dataIda, dataVolta);
  };

  useEffect(() => {
    if (dataVolta?.isBefore(dataIda)) {
      setDataVolta(dataIda);
    }
  }, [dataIda]);

  useEffect(() => {
    if (dataVolta?.isBefore(dataIda)) {
      setDataVolta(dataIda);
      setMensagem("Data de volta deve ser maior que a data de ida!");
      setTipoSnack("error");
      setOpenSnack(true);
    }
  }, [dataVolta]);

  return (
    <FormGroup sx={{ backgroundColor: "#f2f2f2", margin: { xs: "0 auto", md: "1rem auto", lg: "2rem auto" }, borderRadius: "10px", display: { xs: "none", md: "flex" } }}>
      <form onSubmit={(event) => aoBuscar(event)}>
        <Grid container alignItems="center" padding={1}>
          <Grid item xs={12} md={4}>
            <AutocompleteComponent valor={busca} setValor={setBusca} />
          </Grid>
          <Grid item xs={3}>
            <CampoData
              obrigatorio={true}
              label="Data de Ida"
              valor={dataIda}
              setData={setDataIda}
            />
          </Grid>
          <Grid item xs={3}>
            <CampoData
              obrigatorio={true}
              label="Data de Volta"
              valor={dataVolta}
              setData={setDataVolta}
            />
          </Grid>
          <Grid item display="flex" xs={2} width="100%" marginTop="1.5rem" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#287881",
                margin: "0.5rem",
                "&:hover": { backgroundColor: "#eb540f" }
              }}

            >
              Buscar <GrSearch size={15} />
            </Button>
          </Grid>
        </Grid>
      </form>
      <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
    </FormGroup >
  );
}

export default Formulario;