import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Excursao } from "types/excursao";
interface Props extends Excursao {
  selecionarExcursao: (excursaoSelecionada: Excursao) => void
}

function CardExcursao({ id, titulo, origem, destino, dataIda, horaIda, dataVolta, horaVolta, categoria, imgUrl, localEmbarque, valorTotal, selecionado, selecionarExcursao }: Props) {

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea onClick={() => selecionarExcursao({ id, titulo, origem, destino, dataIda, horaIda, dataVolta, horaVolta, categoria, imgUrl, localEmbarque, valorTotal, selecionado })}>
        <CardMedia
          component="img"
          height="140"
          image={imgUrl}
          alt="Cidade Destino Excursão"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {destino}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data Partida: {dataIda}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data Volta: {dataVolta}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Categoria: {categoria}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A partir: {valorTotal?.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardExcursao;
