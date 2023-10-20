import { useState } from "react";
import { Typography, Grid, Card, CardContent, CardMedia, List, ListItem, Button } from "@mui/material";
import { GrClose, GrStar } from "react-icons/gr";
import { BiDollarCircle } from "react-icons/bi";
import formasPagamento from "data/formasPagamento.json";
import Cabecalho from "componentes/Cabecalho/cabecalho";
import { Excursao } from "types/excursao";
import { Link, useLocation } from "react-router-dom";
import ModalReserva from "componentes/ModalReserva/modalReserva";

export default function ExcursaoPage() {
  const location = useLocation();
  const excursao: Excursao = location.state;
  const [open, setOpen] = useState(false);

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
    setOpen(true);
  };

  const fecharModal = () => {
    setOpen(false);
  };

  return (
    <Grid >
      <Cabecalho />
      <Grid container spacing={2} sx={{
        bgcolor: "background.paper",
        // boxShadow: 1,
        // borderRadius: '5px',
        border: "none",
        width: "95vw",
        p: 2,
        m: 2,
        display: "flex",
        maxWidth: "95vw",
      }}>
        <Grid item container sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <Typography variant="h4" sx={{ flex: 1 }}>{excursao?.titulo}</Typography>
          <Button variant="contained" sx={{ marginLeft: "auto" }} onClick={abrirModal}>
            Reservar
          </Button>
          <Link to={"/"}>
            <Button variant="text" sx={{ marginLeft: "auto", alignItems: "center" }}>
              <GrClose size={20} />
            </Button>
          </Link>
        </Grid>
        <Grid item container xs={12} sm={12} md={6} spacing={2}>
          <Grid item xs={12} >
            <Card sx={{ height: "100%" }} >
              <CardContent>
                <Typography>Aqui estara a descrição da excursao</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Origem: {excursao.origem}</Typography>
                <Typography variant="h6">Destino: {excursao.destino}</Typography>
                <Typography variant="h6">Saída: {excursao?.dataIda}</Typography>
                <Typography variant="h6">Volta: {excursao?.dataVolta}</Typography>

                <List color='black'>
                  <Typography> Formas de Pagamento:</Typography>
                  <Grid container xs={12} sm={12} >
                    {formasPagamento.map((item) => (
                      <Grid item key={item.id} xs={12} sm={12} md={6}>
                        <ListItem><BiDollarCircle size={20} />{item.descricao}</ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </List>
                <Typography variant="h5">Valor: R${excursao.valorTotal.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={12} md={6} spacing={2} >
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                alt="Destination Image"
                height="100%"
                image={excursao?.imgUrl}
              />
            </Card>
          </Grid>
          <Grid item xs={12} >
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
      <ModalReserva excursao={excursao} open={open} onClose={fecharModal} />
    </Grid>
  );
}