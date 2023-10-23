import { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Container,
  Grid,
  CardContent,
  Button,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert
} from "@mui/material";
import { Excursao } from "../../../types/excursao";
import { GrAdd, GrClose, GrFormNext, GrFormPrevious, GrSend, GrSubtract } from "react-icons/gr";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import formasPagamento from "data/formasPagamento.json";
import { Viajante } from "types/viajantes";
import { Reserva } from "types/reserva";
import { Usuario } from "types/usuario";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";

interface Props {
  usuario: Usuario
  excursao: Excursao
  open: boolean
  onClose: () => void
}

type tipoSnack = "error" | "info" | "success" | "warning";
const ModalReserva = ({ open, onClose, excursao, usuario }: Props) => {
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<tipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [qtde, setQtde] = useState(1);
  const [passo, setPasso] = useState(0);
  const [reserva, setReserva] = useState<Reserva>({
    id: 0,
    idExcursao: 0,
    idUsuario: 0,
    qtdViajantes: 0,
    formaPagamento: 0
  });
  const [viajantes, setViajantes] = useState<Viajante[]>([]);
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

  const ListaPassageiros = () => {
    const atualizarNomeViajante = (index: number, nome: string) => {
      const novosViajantes = [...viajantes];
      novosViajantes[index] = { ...novosViajantes[index], nomeViajante: nome };
      setViajantes(novosViajantes);
    };

    const atualizarDocumentoViajante = (index: number, documento: string) => {
      const novosViajantes = [...viajantes];
      novosViajantes[index] = { ...novosViajantes[index], documentoViajante: documento };
      setViajantes(novosViajantes);
    };

    return (
      <Grid item container padding={2} alignItems={"flex-start"} height={"100%"}>
        {Array.from({ length: qtde }).map((_, i) => (
          <Grid item container key={i} xs={12} padding={"0.2rem 0rem"} sx={{
            maxWidth: "100%",
            overflow: "auto"
          }}>
            <Grid item xs={12}>
              <Typography>Dados Viajante {i + 1}:</Typography>
            </Grid>
            <Grid item xs={7} width={"100%"} marginRight={1}>
              <TextField
                size="small"
                required
                label="Nome Completo"
                value={viajantes[i]?.nomeViajante || ""}
                onChange={(e) => atualizarNomeViajante(i, e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                required
                label="Documento"
                value={viajantes[i]?.documentoViajante || ""}
                onChange={(e) => atualizarDocumentoViajante(i, e.target.value)} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };

  const Avaliacao = (mediaAvaliacao: number) => {
    let restoMedia = mediaAvaliacao % 1;
    const mediaInterio = mediaAvaliacao - restoMedia;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= mediaInterio) {
        stars.push(<StarIcon key={i} fontSize="medium" htmlColor="gold" />);
      } else if (restoMedia !== 0) {
        stars.push(<StarHalfIcon key={i} fontSize="medium" htmlColor="gold" />);
        restoMedia = 0;
      }
      else {
        stars.push(<StarOutlineIcon key={i} fontSize="medium" htmlColor="gold" />);
      }
    }

    return (
      <Grid display={"flex"} alignItems={"bottom"}>
        <Typography marginRight={1}>Avaliação:</Typography>
        {stars}
      </Grid>
    );
  };

  const ConfirmaRererva = () => {
    if (qtde === 0) {
      console.log("qtde:", qtde);
      setMensagem("Quantidade de passageiros inválida - Favor Verificar");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    if (reserva.formaPagamento === 0) {
      setMensagem("Nenhuma forma de pagamento Selecionada - Favor Verificar");
      setTipoSnack("error");
      setOpenSnack(true);
      console.log("FormaPgto:", reserva.formaPagamento, "msg:", mensagem);
      return;
    }

    if (viajantes.length !== qtde) {
      console.log("Excursao:", excursao);
      setMensagem("Favor informar todos os passageiros");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    if (!excursao) {
      console.log("Excursao:", excursao);
      setMensagem("Nenhuma Excursão selecionada - Favor Verificar");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    if (!usuario || !usuario.ativo) {
      console.log("usuario:", usuario);
      setMensagem("Favor realizar login - Favor Verificar");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    setReserva({ ...reserva, idExcursao: parseInt(excursao.id), idUsuario: parseInt(usuario.id), qtdViajantes: qtde });
    console.log("Reserva:", reserva);
    setMensagem("Reserva concluída com sucesso");
    setTipoSnack("success");
    setOpenSnack(true);
    setTimeout(() => {
      onClose();
    }, 2000);
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
              <Grid item container xs={12} height={"fit-content"}>
                <Typography bgcolor={passo >= 0 ? "#00FF00" : "#8FBC8F"} sx={{ flex: 1, width: "34%", height: "0.3rem", borderRadius: 0 }} />
                <Typography bgcolor={passo > 0 ? "#00FF00" : "#8FBC8F"} sx={{ width: "33%", height: "0.3rem", borderRadius: 0 }} />
                <Typography bgcolor={passo > 1 ? "#00FF00" : "#8FBC8F"} sx={{ width: "33%", height: "0.3rem", borderRadius: 0 }} />
              </Grid>
              {/* Forma Pagamento e Quantidade Passageiros */}
              {passo === 0 &&
                <>
                  <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"} height={"fit-content"}>
                    <Grid container padding={"1rem 1rem 0rem 1rem"} alignItems={"center"} >
                      <Grid item xs={9}>
                        <Typography variant="h6">{excursao?.titulo}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h5"> R$ {totalGeral?.toFixed(2)}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"} >
                    <Grid container padding={"1rem 1rem 0rem 1rem"}>
                      <Typography textAlign={"left"} variant="subtitle1">
                        Viagem dia <strong>{excursao?.dataIda}</strong> às <strong>{excursao?.horaIda}h</strong> {" "}
                        volta <strong>{excursao?.dataVolta}</strong> às <strong>{excursao?.horaVolta}h</strong>
                      </Typography>
                      <Typography textAlign={"left"} variant="subtitle1">Saindo de <strong>{excursao?.origem}</strong> para <strong>{excursao?.destino}</strong></Typography>
                      <Grid container xs={12} >
                        <FormControl fullWidth>
                          <FormLabel sx={{ color: "black" }}> Formas de Pagamento:</FormLabel>
                          <RadioGroup
                            name="radio-buttons-group"
                            value={reserva?.formaPagamento.toString()}
                            onChange={(event) => {
                              const valor = parseInt(event.target.value);
                              setReserva({ ...reserva, formaPagamento: valor });
                            }}
                          >
                            {formasPagamento.map((formaPagamento) => (
                              <Grid item key={formaPagamento.id} xs={6} height={"fit-content"}>
                                <FormControlLabel
                                  sx={{ height: "10px", fontSize: "small" }}
                                  key={formaPagamento.id}
                                  control={<Radio />}
                                  label={formaPagamento.descricao}
                                  value={formaPagamento.id.toString()}
                                />
                              </Grid>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"}>
                    <Typography variant="h6" textAlign={"left"}>Divulgador</Typography>
                    <Typography textAlign={"left"}>Nome: Douglas Rodrigues</Typography>
                    <Typography textAlign={"left"}>Contato: douglasr.comp@hotamil.com</Typography>
                    {Avaliacao(2.8)}
                  </Grid>
                  <Grid item container padding={"0rem 1rem 0rem 1rem"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>

                    <Grid item xs={6} >
                      <Typography textAlign={"left"}>
                        Quantidade de Passageiros ?
                      </Typography>
                    </Grid>

                    <Grid item xs={6} sm={2} display="flex" alignItems="center" justifyContent="space-between">
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
                </>
              }
              {/* Adicionar Passageiros */}
              {passo === 1 &&
                <Grid item container >
                  <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"} width={"100%"} >
                    {ListaPassageiros()}
                  </Grid>
                </Grid>
              }
              {/* Confirmar reserva */}
              {passo > 1 &&
                <Grid item>
                  <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"center"}>
                      <Typography variant="h6">{excursao?.titulo}</Typography>
                    </Grid>
                    <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"left"}>
                      <Typography variant="h6" textAlign={"left"}>Viajantes: </Typography>
                      {viajantes.map((viajante) => (
                        <Typography key={viajante.nomeViajante} textAlign={"left"}>
                          {viajante.nomeViajante}  - {viajante.documentoViajante}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item xs={12} padding={"1rem 1rem 0rem 1rem"} width={"100%"} textAlign={"left"}>
                      <Typography textAlign={"left"} variant="subtitle1">
                        Viagem dia <strong>{excursao?.dataIda}</strong> às <strong>{excursao?.horaIda}h</strong> {" "}
                        volta <strong>{excursao?.dataVolta}</strong> às <strong>{excursao?.horaVolta}h</strong> <br />
                        Saindo de <strong>{excursao?.origem}</strong> para <strong>{excursao?.destino}</strong> <br />
                        Local de embarque: {excursao?.localEmbarque}
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
                <Button variant="contained" type="submit" onClick={ConfirmaRererva}>
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