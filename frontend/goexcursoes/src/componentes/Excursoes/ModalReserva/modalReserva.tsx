import {
  Button,
  Container,
  Grid,
  Modal,
  Typography
} from "@mui/material";
import usePost from "Api/usePost";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { GrClose, GrFormNext, GrFormPrevious, GrSend } from "react-icons/gr";
import autenticacaoStore from "store/autenticacao.store";
import { IExcursao } from "types/excursao";
import { IFormaPagamentoExcursao } from "types/formaPagamento";
import { IReserva } from "types/reserva";
import { TipoSnack } from "types/tipoSnack";
import { IUsuarioLogado } from "types/usuario";
import { IViajante } from "types/viajantes";
import DadosExcursaoReserva from "./dadosExcursaoReserva";
import FormugalarioViajantes from "./formularioPassageiros";

interface Props {
  usuario: IUsuarioLogado;
  excursao: IExcursao;
  formasPagamento: IFormaPagamentoExcursao[];
  open: boolean;
  onClose: () => void;
}


const ModalReserva = ({ open, onClose, excursao, usuario, formasPagamento }: Props) => {
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [qtde, setQtde] = useState(1);
  const [formaPagtoReserva, setFormaPagtoReserva] = useState(0);
  const [totalGeral, setTotalGeral] = useState(0);
  const [passo, setPasso] = useState(0);


  const [reserva, setReserva] = useState<IReserva>({
    idReserva: 0,
    idExcursaoReserva: 0,
    idUsuarioReserva: 0,
    qtdViajantesReserva: 0,
    valorTotalReserva: 0,
    formaPagtoReserva: 0
  });
  const [dataIda, setDataIda] = useState<Dayjs | null>(dayjs());
  const [dataVolta, setDataVolta] = useState<Dayjs | null>(dayjs());
  const [viajantes, setViajantes] = useState<IViajante[]>([]);

  useEffect(() => {
    setDataIda(dayjs(excursao.dataIdaExcursao));
    setDataVolta(dayjs(excursao.dataVoltaExcursao));
    setTotalGeral(excursao.valorExcursao);
  }, [excursao]);

  useEffect(() => {
    if (reserva.valorTotalReserva > 0) {
      usePost<IReserva>({ url: "viajantes", dados: reserva, token: autenticacaoStore.usuario.tokenUsuario })
        .then((resposta) => {
          if (resposta.data) {
            addViajantes(resposta.data.idReserva);
          }
        })
        .catch(erro => {
          setMensagem("Erro ao eftuar reserva!");
          setTipoSnack("error");
          setOpenSnack(true);
          console.log(erro);
        }).finally();
    }
  }, [reserva]);

  const addViajantes = (idReserva: number) => {
    const novosViajantes = { ...viajantes, idReserva: idReserva };
    console.log("Viajantes: ", viajantes);
    usePost<IViajante>({ url: "reserva", dados: novosViajantes, token: autenticacaoStore.usuario.tokenUsuario })
      .then((resposta) => {
        if (resposta.data) {
          setMensagem("Reserva concluída com sucesso!");
          setTipoSnack("success");
          setOpenSnack(true);
          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          setMensagem("Erro ao eftuar reserva!");
          setTipoSnack("error");
          setOpenSnack(true);
        }
      })
      .catch(erro => {
        setMensagem("Erro ao eftuar reserva!");
        setTipoSnack("error");
        setOpenSnack(true);
        console.log(erro);
      });
  };

  const ConfirmaRererva = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (qtde === 0) {
      setMensagem("Quantidade de passageiros inválida - Favor Verificar");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    if (formaPagtoReserva === 0) {
      setMensagem("Nenhuma forma de pagamento Selecionada - Favor Verificar");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    if (viajantes.length !== qtde) {
      setMensagem("Favor informar todos os passageiros");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    if (!excursao) {
      setMensagem("Nenhuma Excursão selecionada - Favor Verificar");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    if (!usuario) {
      setMensagem("Favor realizar login - Favor Verificar");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    setReserva({
      ...reserva,
      idUsuarioReserva: usuario.idUsuario,
      idExcursaoReserva: excursao.idExcursao,
      qtdViajantesReserva: qtde,
      valorTotalReserva: totalGeral,
      formaPagtoReserva: formaPagtoReserva
    });

    return;
  };

  return (
    <Modal open={open} onClose={onClose} sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <>
        <Grid container sx={{
          bgcolor: "AliceBlue",
          borderRadius: "5px",
          boxShadow: "rgb(99, 99, 99, 10) 0px 5px 10px 0px",
          width: { xs: "95%", md: "60%" },
          height: "95vh",
          maxWidth: "95vw",
          maxHeight: "95vh",
          overflowY: "auto"
        }}>
          {/* Informações */}
          <Container>
            <Grid container display={"flex"} flexDirection={"row"} alignItems={"flex-start"} justifyContent={"center"}>
              <Grid item display={"flex"} alignItems={"flex-start"} padding={"1rem 1rem 0rem 1rem"} height={"fit-content"} width={"100%"}>
                <Typography variant="h5" sx={{ flex: 1 }}>{passo > 1 ? "Confirmar Reserva?" : "Informações da Reserva:"} </Typography>
                <Button variant="text" onClick={onClose} sx={{ marginLeft: "auto" }}>
                  <GrClose size={20} />
                </Button>
              </Grid>
              <Grid container height={"fit-content"}>
                <Typography bgcolor={passo >= 0 ? "#00FF00" : "#8FBC8F"} sx={{ flex: 1, width: "34%", height: "0.3rem", borderRadius: 0 }} />
                <Typography bgcolor={passo > 0 ? "#00FF00" : "#8FBC8F"} sx={{ width: "33%", height: "0.3rem", borderRadius: 0 }} />
                <Typography bgcolor={passo > 1 ? "#00FF00" : "#8FBC8F"} sx={{ width: "33%", height: "0.3rem", borderRadius: 0 }} />
              </Grid>
              {/* Forma Pagamento e Quantidade Passageiros */}
              {passo === 0 &&
                <DadosExcursaoReserva
                  excursao={excursao}
                  formasPagamento={formasPagamento}
                  formaPagtoReserva={formaPagtoReserva}
                  setFormaPagtoReserva={setFormaPagtoReserva}
                  qtde={qtde}
                  setQtde={setQtde}
                  totalGeral={totalGeral}
                  setTotalGeral={setTotalGeral}
                  dataIda={dataIda?.format("DD/MM/YYYY")}
                  dataVolta={dataVolta?.format("DD/MM/YYYY")} />
              }
              {/* Adicionar Passageiros */}
              {passo === 1 &&
                <Grid item container padding={"0rem 1rem 0rem 1rem"} alignItems={"flex-start"} >
                  <FormugalarioViajantes viajantes={viajantes} setViajantes={setViajantes} qtde={qtde} />
                </Grid>
              }
              {/* Confirmar reserva */}
              {passo > 1 &&
                <Grid item>
                  <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"center"}>
                      <Typography variant="h6">{excursao.tituloExcursao}</Typography>
                    </Grid>
                    <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"left"}>
                      <Typography variant="h6" textAlign={"left"}>Viajantes: </Typography>
                      {viajantes.map((viajante) => (
                        <Typography key={viajante.nomeViajantes} textAlign={"left"}>
                          {viajante.nomeViajantes}  - {viajante.documentoViajantes}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"left"}>
                      <Typography textAlign={"left"} variant="subtitle1">
                        Viagem dia <strong>{dataIda?.format("DD/MM/YYYY")}</strong>
                        às <strong>{excursao.horaIdaExcursao}h</strong> {" "}

                        volta <strong>{dataVolta?.format("DD/MM/YYYY")}</strong>
                        às <strong>{excursao.horaVoltaExcursao}h</strong> <br />

                        Saindo de <strong>{excursao.cidadeOrigemExcursao}</strong>
                        para <strong>{excursao?.cidadeDestinoExcursao}</strong> <br />
                        Local de embarque: {excursao.localEmbarqueExcursao}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"left"} >
                      <Grid container justifyContent={"space-between"}>
                        <Typography textAlign={"left"} variant="h6">
                          <strong> {qtde > 1 ? `${qtde} x Pacotes` : `${qtde} x Pacote`} </strong>
                        </Typography>
                        <Typography variant="h5"> <strong>R$ {totalGeral?.toFixed(2)}</strong></Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              }
            </Grid>
          </Container>
          {/* Botoes */}
          <Grid container display="flex" flexDirection="column" alignItems={"flex-end"}>
            <Grid item xs={12} padding={"1rem 1rem 1rem 1rem"} width={"100%"} display={"flex"} alignItems={"flex-end"}>
              {passo >= 1 &&
                <Button variant="contained" onClick={() => setPasso(passo - 1)} sx={{ marginRight: "auto" }}>
                  <GrFormPrevious size={20} /><span style={{ marginLeft: "5px" }}>Voltar</span>
                </Button>
                /* <Button variant="contained" onClick={() => setPasso(passo + 1)} >
                <span style={{ marginRight: "5px" }}>Avançar</span>
                <GrFormNext size={20} />
                </Button> */
              }
              {passo > 1 &&
                <Button variant="contained" type="submit" onClick={(event) => ConfirmaRererva(event)}>
                  <GrSend size={20} /><span style={{ marginLeft: "5px" }}>Confirmar</span>
                </Button>
              }
              {passo < 2 &&
                <Button variant="contained" type="submit" onClick={() => setPasso(passo + 1)} sx={{ marginLeft: "auto" }}>
                  <span style={{ marginRight: "5px" }}>Avançar</span>
                  <GrFormNext size={20} />
                </Button>
              }
              <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
            </Grid>
          </Grid>
        </Grid>
      </>
    </Modal >
  );
};

export default ModalReserva;