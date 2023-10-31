import { Button, Card, CardContent, CardMedia, Grid, List, ListItem, Typography } from "@mui/material";
import ModalReserva from "componentes/Excursoes/ModalReserva/modalReserva";
import formasPagamento from "data/formasPagamento.json";
import dayjs, { Dayjs } from "dayjs";
import http from "http/http";
import { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { GrClose, GrStar } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { Excursao } from "types/excursao";
import { Usuario } from "types/usuario";

const usuario: Usuario = { id: "1", login: "douglasr.comp@hotmail.com", senha: "26122015", ativo: true };

export default function ExcursaoPage() {
  const { id } = useParams();
  const [dataIda, setDataIda] = useState<Dayjs | null>(dayjs());
  const [dataVolta, setDataVolta] = useState<Dayjs | null>(dayjs());

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
    localEmbarqueExcursao: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    http.get<Excursao>(`excursao/${id}`)
      .then(resposta => {
        setExcursao(resposta.data);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);

  useEffect(() => {
    setDataIda(dayjs(excursao.dataIdaExcursao));
    setDataVolta(dayjs(excursao.dataVoltaExcursao));
  }, [excursao]);

  if (!excursao) return null;

  const [open, setOpen] = useState(false);


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
    setOpen(true);
  };

  const fecharModal = () => {
    setOpen(false);
  };

  return (
    <Grid >
      <Grid container spacing={2} sx={{
        bgcolor: "background.paper",
        // boxShadow: 1,
        // borderRadius: "5px",
        border: "none",
        width: "95vw",
        p: 2,
        m: 2,
        display: "flex",
        maxWidth: "95vw",
      }}>
        <Grid item container sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <Typography variant="h4" sx={{ flex: 1 }}>{excursao.tituloExcursao}</Typography>
          <Button variant="contained" sx={{ marginLeft: "auto" }} onClick={abrirModal}>
            <span>Reservar</span>
          </Button>
          <Button variant="text" sx={{ marginLeft: "auto", alignItems: "center" }} onClick={() => navigate(-1)}>
            <GrClose size={20} />
          </Button>
        </Grid>
        <Grid item container spacing={2} md={6}>
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
                      <Grid item key={item.id} xs={12} sm={12} md={6}>
                        <ListItem><BiDollarCircle size={20} />{item.descricao}</ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </List>
                <Typography variant="h5">Valor: R${excursao.valorExcursao.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item container md={6} spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                alt="Destination Image"
                height="100%"
                image={excursao.urlImagensExcursao}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Divulgador</Typography>
                <Typography>Nome: Douglas Rodrigues</Typography>
                <Typography>Contato: douglasr.comp@hotamil.com</Typography>
                {Avaliacao(4.3)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <ModalReserva excursao={excursao} open={open} onClose={fecharModal} usuario={usuario} />
    </Grid>
  );
}
