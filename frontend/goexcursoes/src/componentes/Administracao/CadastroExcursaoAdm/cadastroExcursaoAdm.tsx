import { Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import categorias from "data/categorias.json";
import dayjs from "dayjs";
import http from "http/http";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Excursao } from "types/excursao";

export default function CadastroExcursaoAdm() {
  const params = useParams();

  const [excursao, setExcursao] = useState<Excursao>({
    idExcursao: 0,
    idUsuarioExcursao: 0,
    tituloExcursao: "",
    descricaoExcursao: "",
    valorExcursao: 0,
    cidadeOrigemExcursao: "",
    cidadeDestinoExcursao: "",
    dataIdaExcursao: "",
    dataVoltaExcursao: "",
    horaIdaExcursao: "",
    horaVoltaExcursao: "",
    idCategoriaExcursao: 0,
    canceladaExcursao: false,
    urlImagensExcursao: "",
    localEmbarqueExcursao: "",
    selecionado: undefined
  });
  const [categoria, setCategoria] = useState(0);

  useEffect(() => {
    if (params.id) {
      http.get<Excursao>(`excursao/${params.id}`)
        .then(resposta => {
          setExcursao(resposta.data);
          console.log(excursao);

        })
        .catch(erro => {
          console.log(erro);
        });
    } else {
      setExcursao({
        idExcursao: 0,
        idUsuarioExcursao: 0,
        tituloExcursao: "",
        descricaoExcursao: "",
        valorExcursao: 0,
        cidadeOrigemExcursao: "",
        cidadeDestinoExcursao: "",
        dataIdaExcursao: "",
        dataVoltaExcursao: "",
        horaIdaExcursao: "",
        horaVoltaExcursao: "",
        idCategoriaExcursao: 0,
        canceladaExcursao: false,
        urlImagensExcursao: "",
        localEmbarqueExcursao: "",
        selecionado: undefined
      });
    }

  }, [params]);

  const SalvarExcursao = () => {
    http.post("/excursao");
  };

  const ExcluirExcursao = () => {
    if (params.id) http.delete(`/excursao/${excursao.idExcursao}`);
  };

  // useEffect(() => {
  //   const categoriaSelecionada = categorias.find(iten => iten.descricao === categoria);
  //   // if (categoriaSelecionada) 
  // }, [categoria]);

  return (

    <FormGroup onSubmit={SalvarExcursao}>
      <Typography variant="h6" color="initial">Dados Excursão:</Typography>
      <Grid container display={"flex"} flexDirection={"row"} overflow={"auto"} maxHeight={"90vh"}>
        <Grid item xs={12}>
          <TextField margin="dense" fullWidth
            label="Id Usuario:"
            value={excursao?.idUsuarioExcursao.toString()}
            onChange={(event) => {
              const valor = event.target.value;
              setExcursao({ ...excursao, idUsuarioExcursao: parseInt(valor) });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField margin="dense" fullWidth
            label="Titulo:"
            value={excursao?.tituloExcursao}
            onChange={(event) => {
              const valor = event.target.value;
              setExcursao({ ...excursao, tituloExcursao: valor });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField margin="dense" fullWidth
            label="Descrição:"
            multiline
            rows={2}
            value={excursao?.descricaoExcursao}
            onChange={(event) => {
              const valor = event.target.value;
              setExcursao({ ...excursao, descricaoExcursao: valor });
            }}
          />
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={6} paddingRight={1}>
            <TextField margin="dense" fullWidth
              label="Cidade Origem:"
              value={excursao?.cidadeOrigemExcursao}
              onChange={(event) => {
                const valor = event.target.value;
                setExcursao({ ...excursao, cidadeOrigemExcursao: valor });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" fullWidth
              label="Cidade Destino:"
              value={excursao?.cidadeDestinoExcursao}
              onChange={(event) => {
                const valor = event.target.value;
                setExcursao({ ...excursao, cidadeDestinoExcursao: valor });
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField margin="dense" fullWidth
            label="Valor Total:"
            type=""
            value={excursao?.valorExcursao.toFixed(2).toString()}
            onChange={(event) => {
              const valor = Number(parseFloat(event.target.value).toFixed(2));
              if (!isNaN(valor)) {
                setExcursao({ ...excursao, valorExcursao: Number(valor) });
              } else {
                setExcursao({ ...excursao, valorExcursao: 0 });
              }
            }}
          />
        </Grid>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="labelCategoria">Categoria</InputLabel>
          <Select
            label="Categoria"
            labelId="labelCategoria"
            id="selectCategoria"
            required
            value={categoria}
            onChange={(evento) => {
              const valor = evento.target.value;
              setCategoria(Number(valor));
            }}>
            <MenuItem><em>{""}</em></MenuItem>
            {categorias.map((categoria) =>
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.descricao}
              </MenuItem>)
            }
          </Select>
        </FormControl>
        <Grid container xs={12} >
          <Grid item xs={4} alignItems={"center"} paddingRight={1}>
            <DatePicker sx={{ margin: "0.5rem 0.5rem 0.5rem 0", width: "100%" }}
              label="Data e hora saída:"
              value={dayjs(excursao?.dataIdaExcursao)}
              onChange={(event) => {
                const valor = event;
                if (valor) setExcursao({ ...excursao, dataIdaExcursao: valor.format("YYYY-MM-DD") });
              }}
            />
          </Grid>
          <Grid item xs={2} >
            <TextField fullWidth sx={{ padding: "0.5rem 0.5rem 0.5rem 0" }}
              type="time"
              value={excursao?.horaIdaExcursao}
              onChange={(event) => {
                const valor = event.target.value;
                setExcursao({ ...excursao, horaIdaExcursao: valor });
              }}
            />
          </Grid>
          <Grid item xs={4} alignItems={"center"} paddingRight={1}>
            <DatePicker sx={{ margin: "0.5rem 0rem", width: "100%" }}
              label="Data e hora saída:"
              value={dayjs(excursao?.dataVoltaExcursao)}
              onChange={(event) => {
                const valor = event;
                if (valor) setExcursao({ ...excursao, dataVoltaExcursao: valor.format("YYYY-MM-DD") });
              }}
            />
          </Grid>
          <Grid item xs={2} >
            <TextField fullWidth sx={{ padding: "0.5rem 0rem 0.5rem 0.5rem" }}
              aria-label="Hora Saída:"
              type="time"
              hiddenLabel={true}
              value={excursao?.horaVoltaExcursao}
              onChange={(event) => {
                const valor = event.target.value;
                setExcursao({ ...excursao, horaVoltaExcursao: valor });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container display={"flex"} justifyContent={"space-between"} marginTop={1} alignItems={"end"}>
        <Grid item xs={1} >
          {excursao.idExcursao ?
            <Button variant="outlined" type="button" onClick={ExcluirExcursao}>Excluir</Button> : ""
          }
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" type="submit" onClick={ExcluirExcursao}>Gravar</Button>
        </Grid>
      </Grid>
    </FormGroup >
  );
}