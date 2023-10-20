import { useEffect, useState } from "react";
import { Modal, Typography, Grid, Card, CardContent, Input, Button, List, ListItem, IconButton } from "@mui/material";
import { Excursao } from "../../types/excursao";
import { GrAdd, GrCheckmark, GrClose, GrStar, GrSubtract } from "react-icons/gr";
import { BiDollarCircle } from "react-icons/bi";
import formasPagamento from "data/formasPagamento.json";
interface Props {
  excursao: Excursao | undefined
  open: boolean
  onClose: () => void
}

const ModalReserva = ({ open, onClose, excursao }: Props) => {
  const [qtde, setQtde] = useState(1);
  const [totalGeral, setTotalGeral] = useState(excursao?.valorTotal);

  const removeQtde = () => {
    if (qtde > 1) setQtde(qtde - 1);
  };

  const addQtde = () => {
    setQtde(qtde + 1);
  };

  useEffect(() => {
    if (qtde > 0 && excursao?.valorTotal) {
      setTotalGeral(excursao.valorTotal * qtde);
    }
  }, [qtde, setTotalGeral]);

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

  return (
    <Modal open={open} onClose={onClose} sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Grid container sx={{
        bgcolor: "AliceBlue",
        boxShadow: 1,
        borderRadius: "5px",
        width: "50%",
        height: "95vh",
        p: 2,
        m: "2rem",
        display: "flex",
        maxWidth: "95vw",
        maxHeight: "95vh",
        overflowY: "auto"
      }}>
        <Grid container xs={12}>
          <Grid item sx={{ display: "flex", alignItems: "center" }} padding={"1rem 1rem 0rem 1rem"} width={"100%"}>
            <Typography variant="h5" sx={{ flex: 1 }}>Informações da Reserva:</Typography>
            <Button variant="text" onClick={onClose} sx={{ marginLeft: "auto" }}>
              <GrClose size={20} />
            </Button>
          </Grid>
          <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"} >
            <Grid container padding={2} alignItems={"center"} height={"100%"}>
              <Grid item xs={9}>
                <Typography variant="h6">{excursao?.titulo}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5"> R$ {totalGeral?.toFixed(2)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"}>
            <CardContent>
              <Typography>Saindo de {excursao?.destino} para {excursao?.destino}</Typography>
              <Typography></Typography>
              <Typography>Viagem de {excursao?.dataIda} à {excursao?.dataVolta}</Typography>
              <Typography></Typography>
              <List color='black'>
                <Typography> Formas de Pagamento Aceitas:</Typography>
                <Grid container xs={12} sm={12} >
                  {formasPagamento.map((item) => (
                    <Grid item key={item.id} xs={12} sm={12} md={6}>
                      <ListItem><BiDollarCircle size={20} />{item.descricao}</ListItem>
                    </Grid>
                  ))}
                </Grid>
              </List>
            </CardContent>
          </Grid>
          <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"}>
            <CardContent>
              <Typography variant="h6">Divulgador</Typography>
              <Typography>Nome: Douglas Rodrigues</Typography>
              <Typography>Contato: douglasr.comp@hotamil.com</Typography>
              {Avaliacao(4.3)}
            </CardContent>
          </Grid>
          <Grid item container padding={"0rem 1rem 0rem 1rem"} display={"flex"} alignItems={"center"}>

            <Grid item xs={10}>
              <Typography>
                Quantidade de Passageiros ?
              </Typography>
            </Grid>

            <Grid item xs={2} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <IconButton onClick={removeQtde}>
                <GrSubtract />
              </IconButton>
              <Typography variant="h5">
                {qtde}
              </Typography>
              <IconButton onClick={addQtde}>
                <GrAdd />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"}>
            <Button variant="contained" onClick={onClose} sx={{ float: "right", justifyContent: "space-between" }}>
              <GrCheckmark size={20} /><span style={{ marginLeft: "5px" }}>Confirmar</span>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalReserva;