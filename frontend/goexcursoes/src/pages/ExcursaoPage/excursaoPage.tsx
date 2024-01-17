import { Button, Card, CardContent, Grid, List, ListItem, Typography } from "@mui/material";
import useGet from "Api/useGet";
import Galeria from "componentes/Excursoes/Galeria/galeria";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import ModalReserva from "componentes/Reserva/ModalReserva/modalReserva";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { GrClose, GrStar } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";
import { IExcursao } from "types/excursao";
import { IFormaPagamentoExcursao } from "types/formaPagamento";
import { TipoSnack } from "types/tipoSnack";
import { IDivulgador } from "types/usuario";

export default function ExcursaoPage() {
  const { id } = useParams();
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [dataIda, setDataIda] = useState<Dayjs | null>(dayjs());
  const [dataVolta, setDataVolta] = useState<Dayjs | null>(dayjs());
  const [formasPagamento, setFormasPagamento] = useState<IFormaPagamentoExcursao[]>([]);
  const [open, setOpen] = useState(false);
  const [imagens, setImagens] = useState<string[]>([]);
  const [divulgador, setDivulgador] = useState<IDivulgador>({
    idUsuario: 0,
    loginUsuario: "",
    nomeUsuario: "",
  });

  const [excursao, setExcursao] = useState<IExcursao>({
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
    categoriaExcursao: { idCategoria: 0, descricaoCategoria: "" },
    canceladaExcursao: false,
    urlImagensExcursao: "",
    localEmbarqueExcursao: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    useGet<IExcursao>({ url: `excursao/${id}`, token: autenticacaoStore.usuario.tokenUsuario })
      .then(resposta => {
        setExcursao(resposta.data as IExcursao);
      })
      .catch(erro => {
        console.log(erro);
      });
    useGet<string[]>({ url: `excursao/imagens/${id}`, token: autenticacaoStore.usuario.tokenUsuario })
      .then((response) => {
        if (response.data) {
          setImagens(response.data);
        }
      }).catch(erro => console.log(erro));
  }, []);

  useEffect(() => {
    if (excursao.idExcursao > 0) {
      useGet({ url: `excursao/${excursao.idExcursao}/formasPagtoExcursao`, token: autenticacaoStore.usuario.tokenUsuario })
        .then((resposta) => {
          setFormasPagamento(resposta.data as IFormaPagamentoExcursao[]);
        })
        .catch(erro => {
          setMensagem("Erro ao buscar formas Pagamento!");
          setTipoSnack("error");
          setOpenSnack(true);
          console.log(erro);
        }).finally();
      useGet<IDivulgador>({ url: `usuario/${excursao.idUsuarioExcursao}`, token: autenticacaoStore.usuario.tokenUsuario })
        .then((response) => {
          if (response.data) {
            setDivulgador(response.data as IDivulgador);
          }
        }).catch(erro => console.log(erro));
    }
    setDataIda(dayjs(excursao.dataIdaExcursao));
    setDataVolta(dayjs(excursao.dataVoltaExcursao));
  }, [excursao]);

  if (!excursao) return null;

  function Avaliacao(mediaAvaliacao: number) {
    const mediaRounded = Math.round(mediaAvaliacao);

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < mediaRounded) {
        stars.push(<GrStar key={i} size={20} color="#FFD700" />);
      } else {
        stars.push(<GrStar key={i} size={20} color="#ccc" />);
      }
    }

    return (
      <Grid display={"flex"} alignItems={"bottom"}>
        <Typography marginRight={1}>Avaliação:</Typography>
        {stars}
      </Grid>
    );
  }

  const abrirModal = () => {
    if (!autenticacaoStore.estaAutenticado) {
      setMensagem("Favor realizar login!");
      setTipoSnack("error");
      setOpenSnack(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    setOpen(true);
  };

  const fecharModal = () => {
    setOpen(false);
  };

  return (

    <Grid container spacing={2} sx={{
      bgcolor: "background.paper",
      // boxShadow: 1,
      // borderRadius: "5px",
      border: "none",
      width: "95vw",
      p: 2,
      m: 2,
      display: "flex",
    }}>
      <Grid container sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <Typography variant="h4" sx={{ flex: 1 }}>{excursao.tituloExcursao}</Typography>
        <Button variant="contained" sx={{ marginLeft: "auto" }} onClick={abrirModal}>
          <span>Reservar</span>
        </Button>
        <Button variant="text" sx={{ marginLeft: "auto", alignItems: "center" }} onClick={() => navigate(-1)}>
          <GrClose size={20} />
        </Button>
      </Grid>
      <Grid container spacing={2} md={6} marginRight={{ xs: 0, md: 2 }} marginBottom={{ xs: 2, md: 0 }}>
        <Grid item xs={12}>
          <Card sx={{ height: "100%" }} >
            <CardContent>
              <Typography>{excursao.descricaoExcursao}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Origem: {excursao.cidadeOrigemExcursao}</Typography>
              <Typography variant="h6">Destino: {excursao.cidadeDestinoExcursao}</Typography>
              <Typography variant="h6">
                Saída: {dataIda?.format("DD/MM/YYYY")} às {excursao.horaIdaExcursao}
              </Typography>
              <Typography variant="h6">
                Volta: {dataVolta?.format("DD/MM/YYYY")} às {excursao.horaVoltaExcursao}
              </Typography>

              <List color='black'>
                <Typography> Formas de Pagamento:</Typography>
                <Grid container>
                  {formasPagamento.map((item) => (
                    <Grid item key={item.idFormaPagto} xs={12} sm={12} md={6}>
                      <ListItem><BiDollarCircle size={20} />{item.descricaoFormaPagamento}</ListItem>
                    </Grid>
                  ))}
                </Grid>
              </List>
              <Typography variant="h5">Valor: R${excursao.valorExcursao.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container md={6} spacing={2}>
        <Grid item xs={12} height={"30rem"}>
          <Card sx={{ height: "100%", padding: "0.5rem" }} >
            <Galeria imagens={imagens} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Divulgador</Typography>
              <Typography>Nome: {divulgador.nomeUsuario}</Typography>
              <Typography>Contato: {divulgador.loginUsuario}</Typography>
              {Avaliacao(4.3)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ModalReserva excursao={excursao} open={open} onClose={fecharModal} usuario={autenticacaoStore.usuario} formasPagamento={formasPagamento} divulgador={divulgador} />
      <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
    </Grid >

  );
}
