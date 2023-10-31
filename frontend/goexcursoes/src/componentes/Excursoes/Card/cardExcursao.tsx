import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import categorias from "data/categorias.json";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Excursao } from "types/excursao";
interface Props {
  excursao: Excursao,
  selecionarExcursao: (idSelecionada: number) => void,
}

function CardExcursao({ excursao, selecionarExcursao }: Props) {
  const [dataIda, setDataIda] = useState<Dayjs | null>(dayjs());
  const [dataVolta, setDataVolta] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    setDataIda(dayjs(excursao.dataIdaExcursao));
    setDataVolta(dayjs(excursao.dataVoltaExcursao));
  }, []);

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea onClick={() => selecionarExcursao(excursao.idExcursao)}>
        <CardMedia
          component="img"
          height="140"
          image={excursao.urlImagensExcursao}
          alt="Cidade Destino Excursão"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {excursao.tituloExcursao}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data Partida: {dataIda?.format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data Volta: {dataVolta?.format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Categoria: {categorias[excursao.idCategoriaExcursao].descricao}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            A partir: {excursao.valorExcursao?.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardExcursao;
