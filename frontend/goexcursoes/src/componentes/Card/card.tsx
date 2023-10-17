import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Excursao } from '../../types/excursao';

interface Props extends Excursao {
  selecionarExcursao: (excursaoSelecionada: Excursao) => void
}

const CardExcursao: React.FC<Props> = ({ id, destino, dataIda, dataVolta, categoria, imgUrl, selecionado, selecionarExcursao }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => selecionarExcursao({ id, destino, dataIda, dataVolta, categoria, imgUrl, selecionado })}>
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
            Data Partida: {dataIda?.format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data Volta: {dataVolta?.format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Categoria: {categoria}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardExcursao;
