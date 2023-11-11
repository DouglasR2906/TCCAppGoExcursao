import { CardActionArea, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useGet from "Api/useGet";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import autenticacaoStore from "store/autenticacao.store";
import { IExcursao } from "types/excursao";
interface Props {
  excursao: IExcursao,
  selecionarExcursao: (idSelecionada: number) => void,
}

function CardExcursao({ excursao, selecionarExcursao }: Props) {
  const [dataIda, setDataIda] = useState<Dayjs | null>(dayjs(excursao.dataIdaExcursao));
  const [dataVolta, setDataVolta] = useState<Dayjs | null>(dayjs(excursao.dataVoltaExcursao));
  const [imagens, setImagens] = useState<string[]>([]);

  useEffect(() => {
    useGet<string[]>({ url: `excursao/imagens/${excursao.idExcursao}`, token: autenticacaoStore.usuario.tokenUsuario })
      .then((response) => {
        if (response.data) {
          setImagens(response.data);
        }
      }).catch(erro => console.log(erro));
  }, []);


  return (
    <Card sx={{ maxWidth: 400, height: 380 }}>
      <CardActionArea onClick={() => selecionarExcursao(excursao.idExcursao)}>
        <CardMedia
          component="img"
          height="180"
          image={imagens[0]}
          alt="Cidade Destino Excursão"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {excursao.tituloExcursao}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Origem:</strong> {excursao.cidadeOrigemExcursao}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Destino:</strong> {excursao.cidadeDestinoExcursao}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Data Partida:</strong> {dataIda?.format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Data Volta:</strong> {dataVolta?.format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Categoria:</strong> {excursao.categoriaExcursao}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <strong>A partir:</strong> {excursao.valorExcursao?.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardExcursao;
