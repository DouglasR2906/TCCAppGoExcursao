import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Excursao as DadosExcursaoProps} from '../../types/excursao'

const CardExcursao: React.FC<DadosExcursaoProps> = ({destino, dataIda, dataVolta, categoria, imgUrl}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardExcursao;
