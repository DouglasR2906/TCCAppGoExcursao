import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import http from "http/http";
import { useEffect, useState } from "react";
import { ICategoria } from "types/categoria";
import { IExcursao } from "types/excursao";
interface Props {
  excursao: IExcursao,
  selecionarExcursao: (idSelecionada: number) => void,
}

function CardExcursao({ excursao, selecionarExcursao }: Props) {
  const [dataIda, setDataIda] = useState<Dayjs | null>(dayjs());
  const [dataVolta, setDataVolta] = useState<Dayjs | null>(dayjs());
  const [categoria, setCategoria] = useState<ICategoria>({ idCategoria: 0, descricaoCategoria: "" });


  useEffect(() => {
    http.get(`categoria/${excursao.idCategoriaExcursao}`)
      .then((resposta) => {
        setCategoria(resposta.data);
      })
      .catch(erro => {
        console.log(erro);
      });
    setDataIda(dayjs(excursao.dataIdaExcursao));
    setDataVolta(dayjs(excursao.dataVoltaExcursao));
  }, []);

  return (
    <Card sx={{ maxWidth: 400, height: "100%" }}>
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
            Categoria: {categoria.descricaoCategoria}
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
