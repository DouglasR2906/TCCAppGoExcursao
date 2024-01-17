import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useGet from "Api/useGet";
import usePut from "Api/usePut";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";
import { IExcursao } from "types/excursao";
import { IAtualizarStatus, IReservaDetalhado } from "types/reserva";
import { TipoSnack } from "types/tipoSnack";
import { IViajante } from "types/viajantes";

function DetalhesReserva() {
  const { idReserva, reservaDeExcursao } = useParams();
  const navigate = useNavigate();
  const tokenUsuario = autenticacaoStore.usuario.tokenUsuario;
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [reserva, setReserva] = useState<IReservaDetalhado>();
  const [excursao, setExcursao] = useState<IExcursao>();
  const [viajantes, setViajantes] = useState<IViajante[]>([]);
  const [imagens, setImagens] = useState<string[]>([]);

  useEffect(() => {
    if (idReserva && (Number(idReserva) > 0)) {
      useGet<IReservaDetalhado>({ url: `reserva/${idReserva}`, token: tokenUsuario })
        .then((resposta) => {
          if (resposta.data) {
            setReserva(resposta.data as IReservaDetalhado);
          }
        })
        .catch((erro) => console.log(erro))
        .finally();
    }
  }, []);

  useEffect(() => {
    if (reserva && reserva.idReserva > 0) {
      useGet<IExcursao>({ url: `excursao/${reserva.idExcursaoReserva}`, token: tokenUsuario })
        .then((resposta) => {
          if (resposta.data) {
            setExcursao(resposta.data as IExcursao);
          }
        })
        .catch((erro) => console.log(erro))
        .finally();
      useGet<IViajante[]>({ url: `viajantes/reserva/${reserva.idReserva}`, token: tokenUsuario })
        .then((resposta) => {
          if (resposta.data) {
            setViajantes(resposta.data as IViajante[]);
          }
        })
        .catch((erro) => console.log(erro))
        .finally();
    }
  }, [reserva]);

  useEffect(() => {
    if (excursao && excursao.idExcursao > 0) {
      useGet<string[]>({ url: `excursao/imagens/${excursao.idExcursao}`, token: autenticacaoStore.usuario.tokenUsuario })
        .then((response) => {
          if (response.data) {
            setImagens(response.data);
          }
        }).catch(erro => console.log(erro));
    }
  }, [excursao]);

  const recusarReserva = () => {
    if (reserva && reserva.idReserva > 0) {
      const atualizarStatus: IAtualizarStatus = {
        idReserva: reserva.idReserva,
        idClienteReserva: reserva.idClienteReserva,
        idExcursaoReserva: reserva.idExcursaoReserva,
        statusReserva: 1
      };
      usePut<IAtualizarStatus>({ url: `reserva/atualizarStatus/${atualizarStatus.idReserva}`, dados: atualizarStatus, token: autenticacaoStore.usuario.tokenUsuario })
        .then((response) => {
          if (response.error) {
            setMensagem("Erro ao recursar reserva");
            setTipoSnack("error");
            setOpenSnack(true);
          } else {
            setMensagem("Reserva recusada com sucesso");
            setTipoSnack("success");
            setOpenSnack(true);
          }
        })
        .catch(erro => console.log(erro));
    }
  };

  const aceitarReserva = () => {
    if (reserva && reserva.idReserva > 0) {
      const atualizarStatus: IAtualizarStatus = {
        idReserva: reserva.idReserva,
        idClienteReserva: reserva.idClienteReserva,
        idExcursaoReserva: reserva.idExcursaoReserva,
        statusReserva: 2
      };
      usePut<IAtualizarStatus>({ url: `reserva/atualizarStatus/${atualizarStatus.idReserva}`, dados: atualizarStatus, token: autenticacaoStore.usuario.tokenUsuario })
        .then((response) => {
          if (response.error) {
            setMensagem("Erro ao aceitar reserva");
            setTipoSnack("error");
            setOpenSnack(true);
          } else {
            setMensagem("Reserva aceita com sucesso");
            setTipoSnack("success");
            setOpenSnack(true);
          }
        }).catch(erro => console.log(erro));
    }
  };
  return (
    <Grid container display="flex" flexDirection="row" alignItems="flex-end">
      <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"center"}>
        <Typography variant="h6">{excursao?.tituloExcursao}</Typography>
      </Grid>
      <Grid item xs={12} sm={4} padding={"1rem 1rem 0rem 1rem"}>
        <CardMedia
          component="img"
          height="180"
          width="80"
          image={imagens[0]}
          alt="Cidade Destino Excursão"
        />
      </Grid>
      <Grid item xs={12} md={6} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"left"}>
        <Typography textAlign={"left"} variant="subtitle1">
          Viagem dia <strong>{dayjs(excursao?.dataIdaExcursao).format("DD/MM/YYYY")} </strong>
          às <strong>{excursao?.horaIdaExcursao}h</strong> {" "}

          volta <strong>{dayjs(excursao?.dataVoltaExcursao).format("DD/MM/YYYY")} </strong>
          às <strong>{excursao?.horaVoltaExcursao}h </strong> <br />

          Saindo de <strong>{excursao?.cidadeOrigemExcursao} </strong>
          para <strong>{excursao?.cidadeDestinoExcursao} </strong> <br />
          <strong>Local de embarque: </strong>{excursao?.localEmbarqueExcursao}
        </Typography>
      </Grid>
      <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} textAlign={"left"}>
        <Typography variant="h6" textAlign={"left"}>Viajantes: </Typography>
        {viajantes.map((viajante) => (
          <Typography key={viajante.nomeViajantes} textAlign={"left"}>
            {viajante.nomeViajantes}  - {viajante.documentoViajantes}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} textAlign={"left"} >
        <Grid container justifyContent={"space-between"}>
          <Typography textAlign={"left"} variant="h6">
            <strong> {(reserva && reserva?.qtdViajantesReserva > 1) ? `${reserva?.qtdViajantesReserva} x Pacotes` : `${reserva?.qtdViajantesReserva} x Pacote`} </strong>
          </Typography>
          <Typography variant="h5"> <strong>R$ {reserva?.valorTotalReserva.toFixed(2)}</strong></Typography>
        </Grid>
      </Grid>
      {reservaDeExcursao &&
        <Grid item xs={12} display="flex" justifySelf="space-between" padding={"1rem 1rem 0rem 1rem"}>
          <Grid container justifyContent={"space-between"}>
            <Button variant="contained" color="warning" onClick={recusarReserva}>Recusar</Button>
            <Button variant="contained" color="primary" onClick={aceitarReserva}>Aceitar</Button>
          </Grid>
        </Grid>
      }
      <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
    </Grid>
  );
}

export default DetalhesReserva;