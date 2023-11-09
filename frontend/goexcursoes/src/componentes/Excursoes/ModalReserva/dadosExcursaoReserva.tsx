import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { IExcursao } from "types/excursao";
import { IFormaPagamentoExcursao } from "types/formaPagamento";

interface Props {
  excursao: IExcursao
  formasPagamento: IFormaPagamentoExcursao[]
  formaPagtoReserva: number
  setFormaPagtoReserva: React.Dispatch<React.SetStateAction<number>>
  qtde: number
  setQtde: React.Dispatch<React.SetStateAction<number>>
  totalGeral: number,
  setTotalGeral: React.Dispatch<React.SetStateAction<number>>
  dataIda: string | undefined
  dataVolta: string | undefined
}

function DadosExcursaoReserva(props: Props) {
  const {
    excursao,
    formasPagamento,
    formaPagtoReserva,
    setFormaPagtoReserva,
    qtde,
    setQtde,
    totalGeral,
    setTotalGeral,
    dataIda,
    dataVolta
  } = props;

  const removeQtde = () => {
    if (qtde > 1) setQtde(qtde - 1);
  };

  const addQtde = () => {
    setQtde(qtde + 1);
  };

  useEffect(() => {
    if (qtde > 0 && excursao.valorExcursao) {
      setTotalGeral(excursao.valorExcursao * qtde);
    }
  }, [qtde, setTotalGeral]);

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
  return (
    <Container>
      <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"} height={"fit-content"}>
        <Grid container padding={"1rem 1rem 0rem 1rem"} alignItems={"center"} >
          <Grid item xs={9}>
            <Typography variant="h6">{excursao.tituloExcursao}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5"> R$ {totalGeral?.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"} >
        <Grid container padding={"1rem 1rem 0rem 1rem"}>
          <Typography textAlign={"left"} variant="subtitle1">
            Viagem dia <strong>{dataIda}</strong> às <strong>{excursao.horaIdaExcursao}h</strong> {" "}
            volta <strong>{dataVolta}</strong> às <strong>{excursao.horaVoltaExcursao}h</strong>
          </Typography>
          <Typography textAlign={"left"} variant="subtitle1">
            Saindo de <strong>{excursao.cidadeOrigemExcursao}</strong>
            para <strong>{excursao.cidadeDestinoExcursao}</strong>
          </Typography>
          <Grid container>
            <FormControl fullWidth>
              <FormLabel sx={{ color: "black" }}> Formas de Pagamento:</FormLabel>
              <RadioGroup
                name="radio-buttons-group"
                value={formaPagtoReserva.toString()}
                onChange={(event) => {
                  const valor = parseInt(event.target.value);
                  setFormaPagtoReserva(valor);
                }}
              >
                <Grid container>

                  {formasPagamento.map((formaPagamento) => (
                    <Grid item key={formaPagamento.idFormaPagto} xs={12} sm={6} height={"fit-content"}>
                      <FormControlLabel
                        sx={{ height: "10px", fontSize: "small" }}
                        key={formaPagamento.idFormaPagto}
                        control={<Radio />}
                        label={formaPagamento.descricaoFormaPagamento}
                        value={formaPagamento.idFormaPagto.toString()}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} padding={"0rem 1rem 0rem 1rem"}>
        <Typography variant="h6" textAlign={"left"}>Divulgador</Typography>
        <Typography textAlign={"left"}>Nome: Douglas Rodrigues</Typography>
        <Typography textAlign={"left"}>Contato: douglasr.comp@hotamil.com</Typography>
        {Avaliacao(4.8)}
      </Grid>
      <Grid container padding={"0rem 1rem 0rem 1rem"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>

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
    </Container>
  );

}
export default DadosExcursaoReserva;