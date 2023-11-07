import { Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import useGet from "Api/useGet";
import usePost from "Api/usePost";
import usePut from "Api/usePut";
import CampoTextoMui from "componentes/Genericos/CampoTexto/campoTextoMui";
import CampoValor from "componentes/Genericos/CampoTexto/campoValor";
import ListaChip from "componentes/Genericos/ListaChip/listaChip";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import UploadImagens from "componentes/Genericos/UploadImagens/uploadImagens";
import dayjs from "dayjs";
import http from "http/http";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";
import { ICategoria } from "types/categoria";
import { IExcursao } from "types/excursao";
import { IFormaPagamento, IFormaPagamentoExcursao } from "types/formaPagamento";
import { TipoSnack } from "types/tipoSnack";

export default function CadastroExcursaoAdm() {
  const params = useParams();
  const [excursao, setExcursao] = useState<IExcursao>({
    idExcursao: 0,
    idUsuarioExcursao: 0,
    tituloExcursao: "",
    descricaoExcursao: "",
    valorExcursao: 0,
    cidadeOrigemExcursao: "",
    cidadeDestinoExcursao: "",
    dataIdaExcursao: dayjs().format("YYYY-MM-DD"),
    dataVoltaExcursao: dayjs().format("YYYY-MM-DD"),
    horaIdaExcursao: `${dayjs().hour().toString().padStart(2, "0")}:${dayjs().minute().toString().padStart(2, "0")}`,
    horaVoltaExcursao: `${dayjs().hour().toString().padStart(2, "0")}:${dayjs().minute().toString().padStart(2, "0")}`,
    categoriaExcursao: 0,
    canceladaExcursao: false,
    urlImagensExcursao: "",
    localEmbarqueExcursao: ""
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [formasPagamentoSelecionadas, setFormasPagamentoSelecionadas] = useState<string[]>([""]);
  const [formasPagamentoLista, setFormasPagamentoLista] = useState<IFormaPagamento[]>([]);
  const [formasPagamentoExcursao, setFormasPagamentoExcursao] = useState<IFormaPagamentoExcursao[]>([]);
  const [idUsuario, setIdUsuario] = useState<string | number>(0);
  const [titutlo, setTitutloExcursao] = useState<string | number>("");
  const [descricao, setDescricao] = useState<string | number>("");
  const [cidadeOrigem, setCidadeOrigem] = useState<string | number>("");
  const [cidadeDestino, setCidadeDestino] = useState<string | number>("");
  const [dataIda, setDataIda] = useState(dayjs());
  const [dataVolta, setDataVolta] = useState(dayjs());
  const [horaIda, setHoraIda] = useState<string | number>("");
  const [horaVolta, setHoraVolta] = useState<string | number>("");
  const [localEmbarque, setLocalEmbarque] = useState<string | number>("");
  const [categoria, setCategoria] = useState(0);
  const [valorTotal, setValorTotal] = useState({ valor: "0" });
  const [imagens, setImagens] = useState<File[]>([]);

  useEffect(() => {
    useGet({ url: "categoria", token: autenticacaoStore.usuario.tokenUsuario })
      .then((resposta) => {
        setCategorias(resposta.data as ICategoria[]);
      })
      .catch(erro => {
        setMensagem("Erro ao buscar categorias!");
        setTipoSnack("error");
        setOpenSnack(true);
        console.log(erro);
      })
      .finally();
    useGet({ url: "formaPagamento", token: autenticacaoStore.usuario.tokenUsuario })
      .then((resposta) => {
        setFormasPagamentoLista(resposta.data as IFormaPagamento[]);
      })
      .catch((erro) => {
        setMensagem("Erro ao buscar formas de pagamento!");
        setTipoSnack("error");
        setOpenSnack(true);
        console.log(erro);
      });
  }, []);

  useEffect(() => {
    if (params.id && parseInt(params.id) > 0) {
      useGet<IExcursao>({ url: `excursao/${params.id}`, token: autenticacaoStore.usuario.tokenUsuario })
        .then(resposta => {
          setExcursao(resposta.data as IExcursao);
        })
        .catch(erro => {
          console.log(erro);
        }).finally();
      useGet({ url: `excursao/${params.id}/formasPagtoExcursao`, token: autenticacaoStore.usuario.tokenUsuario })
        .then((resposta) => {
          setFormasPagamentoExcursao(resposta.data as IFormaPagamentoExcursao[]);
        })
        .catch(erro => {
          setMensagem("Erro ao buscar formas Pagamento!");
          setTipoSnack("error");
          setOpenSnack(true);
          console.log(erro);
        }).finally();

    } else {
      setExcursao({
        idExcursao: 0,
        idUsuarioExcursao: 0,
        tituloExcursao: "",
        descricaoExcursao: "",
        valorExcursao: 0,
        cidadeOrigemExcursao: "",
        cidadeDestinoExcursao: "",
        dataIdaExcursao: dayjs().format("YYYY-MM-DD"),
        dataVoltaExcursao: dayjs().format("YYYY-MM-DD"),
        horaIdaExcursao: `${dayjs().hour().toString().padStart(2, "0")}:${dayjs().minute().toString().padStart(2, "0")}`,
        horaVoltaExcursao: `${dayjs().hour().toString().padStart(2, "0")}:${dayjs().minute().toString().padStart(2, "0")}`,
        categoriaExcursao: 0,
        canceladaExcursao: false,
        urlImagensExcursao: "",
        localEmbarqueExcursao: ""
      });
      setImagens([]);
      setFormasPagamentoExcursao([]);
      setFormasPagamentoSelecionadas([]);
    }
  }, [params.id]);

  useEffect(() => {
    setIdUsuario(excursao.idUsuarioExcursao);
    setTitutloExcursao(excursao.tituloExcursao);
    setDescricao(excursao.descricaoExcursao);
    setCidadeOrigem(excursao.cidadeOrigemExcursao);
    setCidadeDestino(excursao.cidadeDestinoExcursao);
    setLocalEmbarque(excursao.localEmbarqueExcursao);
    setValorTotal({ valor: excursao.valorExcursao.toString() });
    setCategoria(Number(excursao.categoriaExcursao));
    setDataIda(dayjs(excursao.dataIdaExcursao));
    setDataVolta(dayjs(excursao.dataVoltaExcursao));
    setHoraIda(excursao.horaIdaExcursao);
    setHoraVolta(excursao.horaVoltaExcursao);
  }, [excursao]);

  useEffect(() => {
    const formasPagto: string[] = [];
    formasPagamentoExcursao.map((item) => {
      formasPagto.push(item.descricaoFormaPagamento);
    });
    setFormasPagamentoSelecionadas(formasPagto);
  }, [formasPagamentoExcursao]);

  useEffect(() => {
    if (imagens.length > 0 && excursao.idExcursao > 0) {
      imagens.map((imagem) => {
        EnviarImagens(imagem, excursao.idExcursao);
      });
    }
  }, [imagens]);

  const adicionaNovasFormas = () => {
    const novasFormas: IFormaPagamentoExcursao[] = [];

    formasPagamentoSelecionadas.forEach((item) => {
      const formaSelecioanda = formasPagamentoLista.find(forma => forma.descricaoFormaPagamento === item);
      if (formaSelecioanda) {
        novasFormas.push({
          idFormaPagto: formaSelecioanda.idFormaPagamento,
          idExcursao: excursao.idExcursao,
          descricaoFormaPagamento: formaSelecioanda.descricaoFormaPagamento
        });
      }
    });

    novasFormas.map((item) => {
      usePost({ url: "excursao/addFormaPagtoExcursao", dados: item, token: autenticacaoStore.usuario.tokenUsuario })
        .then()
        .catch(erro => console.log("erro ao adicionar forma pagamento", erro));
    });
    setFormasPagamentoExcursao(novasFormas);
  };

  const SalvarExcursao = () => {
    const excursaoAtualizada: IExcursao = {
      idExcursao: excursao.idExcursao > 0 ? excursao.idExcursao : 0,
      idUsuarioExcursao: Number(autenticacaoStore.usuario.idUsuario),
      tituloExcursao: titutlo.toString(),
      descricaoExcursao: descricao.toString(),
      cidadeOrigemExcursao: cidadeOrigem.toString(),
      cidadeDestinoExcursao: cidadeDestino.toString(),
      localEmbarqueExcursao: localEmbarque.toString(),
      valorExcursao: parseFloat(valorTotal.valor),
      categoriaExcursao: categoria,
      dataIdaExcursao: dataIda.format("YYYY-MM-DD"),
      horaIdaExcursao: horaIda.toString(),
      dataVoltaExcursao: dataVolta.format("YYYY-MM-DD"),
      horaVoltaExcursao: horaVolta.toString(),
      urlImagensExcursao: excursao.idExcursao > 0 ? excursao.urlImagensExcursao : "",
      canceladaExcursao: false
    };
    if (params.id) {
      usePut({ url: "/excursao", dados: excursaoAtualizada, token: autenticacaoStore.usuario.tokenUsuario })
        .then(resposta => {
          setExcursao(resposta.data as IExcursao);
          adicionaNovasFormas();
          setTipoSnack("success");
          setMensagem("Excursao atualizada com sucesso!");
          setOpenSnack(true);
        })
        .catch(erro => {
          setTipoSnack("error");
          setMensagem("Erro ao atualizar excursao!");
          setOpenSnack(true);
          console.log(erro);
        });
    } else {
      usePost({ url: "/excursao", dados: excursaoAtualizada, token: autenticacaoStore.usuario.tokenUsuario })
        .then(resposta => {
          setExcursao(resposta.data as IExcursao);
          setTipoSnack("success");
          setMensagem("Excursao cadastrada com sucesso!");
          setOpenSnack(true);
        })
        .catch(erro => {
          setTipoSnack("error");
          setMensagem("Erro ao cadastrar excursao!");
          setOpenSnack(true);
          console.log(erro);
        });
    }
  };

  const ExcluirExcursao = () => {
    if (params.id) http.delete(`/excursao/${excursao.idExcursao}`);
  };

  return (

    <FormGroup onSubmit={SalvarExcursao}>
      <Typography variant="h6" color="initial">Dados Excursão:</Typography>
      <Grid container display={"flex"} flexDirection={"row"} overflow={"auto"} maxHeight={"70vh"}>
        <Grid item xs={12}>
          <CampoTextoMui label="Id Usuario" valor={idUsuario} setValor={setIdUsuario} tipoDeDado="numerico" />
        </Grid>
        <Grid item xs={12}>
          <CampoTextoMui label="Titulo:" valor={titutlo} setValor={setTitutloExcursao} tipoDeDado="string" />
        </Grid>
        <Grid item xs={12}>
          <TextField margin="dense" fullWidth
            label="Descrição:"
            size="small"
            multiline
            rows={2}
            value={descricao}
            onChange={(event) => {
              const valor = event.target.value;
              setDescricao(valor);
            }}
          />
        </Grid>
        <Grid container >
          <Grid item xs={6} paddingRight={1}>
            <CampoTextoMui label="Cidade Origem:" valor={cidadeOrigem} setValor={setCidadeOrigem} tipoDeDado="string"
            />
          </Grid>
          <Grid item xs={6}>
            <CampoTextoMui label="Cidade Destino:" valor={cidadeDestino} setValor={setCidadeDestino} tipoDeDado="string"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} paddingRight={{ sm: 1 }}>
            <CampoTextoMui label="Local de embarque:" valor={localEmbarque} setValor={setLocalEmbarque} tipoDeDado="string" />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ margin: "0.5rem 0rem 0.5rem 0" }}>
            <CampoValor label="Valor Total:" valor={valorTotal} setValor={setValorTotal} />
          </Grid>
        </Grid>
        <Grid item container alignItems={"center"}>
          <Grid item xs={12} sm={6} paddingRight={{ sm: 1 }}>
            <FormControl margin="dense" fullWidth>
              <InputLabel id="labelCategoria">Categoria</InputLabel>
              <Select
                size="small"
                label="Categoria"
                labelId="labelCategoria"
                id="selectCategoria"
                required
                value={categoria}
                onChange={(evento) => {
                  const valor = evento.target.value;
                  setCategoria(Number(valor));
                }}>
                {categorias.map((categoria) =>
                  <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.descricaoCategoria}
                  </MenuItem>)
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ListaChip
              valor={formasPagamentoSelecionadas}
              setValor={setFormasPagamentoSelecionadas}
            />
          </Grid>
        </Grid>
        <Grid container >
          <Grid item xs={12} sm={3} md={3} alignItems={"center"} >
            <DatePicker sx={{ margin: "0.5rem 0.5rem 0.5rem 0", width: "100%" }}
              label="Data e hora saída:"
              value={dataIda}
              slotProps={{ textField: { size: "small" } }}
              onChange={(event) => {
                const valor = event;
                console.log(valor);
                if (valor) setDataIda(valor);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} paddingRight={{ sm: 1 }}>
            <TextField fullWidth sx={{ padding: { xs: "0rem 0rem 0.5rem 0rem", sm: "0.5rem 0rem 0.5rem 0.5rem" } }}
              size="small"
              type="time"
              value={horaIda}
              onChange={(event) => {
                const valor = event.target.value;
                setHoraIda(valor);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} alignItems={"center"}>
            <DatePicker sx={{ margin: "0.5rem 0rem", width: "100%" }}
              label="Data e hora Volta:"
              value={dataVolta}
              slotProps={{ textField: { size: "small" } }}
              onChange={(event) => {
                const valor = event;
                if (valor) setDataVolta(valor);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} >
            <TextField fullWidth sx={{ padding: { xs: "0rem 0rem 0.5rem 0rem", sm: "0.5rem 0rem 0.5rem 0.5rem" } }}
              size="small"
              type="time"
              value={horaVolta}
              onChange={(event) => {
                const valor = event.target.value;
                setHoraVolta(valor);
              }}
            />
          </Grid>
        </Grid>
        <Grid item container justifyContent={"space-between"}>
          <UploadImagens imagens={imagens} setImagens={setImagens} />
        </Grid>
      </Grid>
      <Grid container display={"flex"} marginTop={1} justifyContent={"space-between"}>
        <Grid item xs={2}>
          {excursao.idExcursao ?
            <Button fullWidth variant="outlined" type="button" onClick={ExcluirExcursao}>Excluir</Button> : ""
          }
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth variant="outlined" type="submit" onClick={SalvarExcursao}>Gravar</Button>
        </Grid>
      </Grid>
      <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
    </FormGroup >
  );
}

export async function EnviarImagens(imagem: File, idExcursao: number) {
  const formData = new FormData();
  formData.append("imagem", imagem);
  console.log(formData.getAll("imagem"));
  http.post(`excursao/upload/imagens/${idExcursao}`, formData, {
    headers: {
      "Authorization": `Bearer ${autenticacaoStore.usuario.tokenUsuario}`,
      "Content-Type": "multipart/form-data"
    }
  })
    .then()
    .catch(erro => console.log(erro));
}