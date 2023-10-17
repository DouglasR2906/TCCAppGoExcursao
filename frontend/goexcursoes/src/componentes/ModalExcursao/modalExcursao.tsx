import { Modal, Typography, Grid, Card, CardContent, CardMedia, Button, List, ListItem } from '@mui/material';
import { Excursao } from '../../types/excursao';
import { GrClose, GrStar } from 'react-icons/gr';
import { BiDollarCircle } from 'react-icons/bi';
interface Props {
    excursao: Excursao | undefined
    open: boolean
    onClose: () => void
}

const ExcursaoModal = ({ open, onClose, excursao }: Props) => {
  const formasPagamento = [
    {
      id: 1,
      descricao: 'Dinheiro'
    },
    {
      id:2,
      descricao: 'Cartão Crédito'
    },
    {
      id:3,
      descricao: 'Cartão Débito'
    },
    {
      id:4,
      descricao: 'PIX'
    }
  ];

  function Avaliacao(mediaAvaliacao: number) {
    const mediaRounded = Math.round(mediaAvaliacao);

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < mediaRounded) {
        stars.push(<GrStar key={i} size={20} color="#FFD700" />);
      } else {
        stars.push(<GrStar key={i} size={20} color="#ccc" />);
      }
    }

    return (
      <Grid display={'flex'} alignItems={'bottom'}>
        <Typography marginRight={1}>Avaliação:</Typography>
        {stars}
      </Grid>
    );
  }

  return (
    <Modal open={open} onClose={onClose} sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Grid container spacing={2} sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: '5px',
        width: '95vw',
        height: '95vh',
        p: 2,
        m: '2rem',
        display: 'flex',
        maxWidth: '95vw',
        maxHeight: '95vh',
        overflowY: 'auto'
      }}>
        <Grid item container sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <Typography variant="h4" sx={{ flex: 1 }}>{excursao?.destino}</Typography>
          <Button variant="text" onClick={onClose} sx={{ marginLeft: 'auto' }}>
            <GrClose size={20} />
          </Button>
        </Grid>
        <Grid item container xs={12} sm={12} md={6} spacing={2}>
          <Grid item xs={12} >
            <Card sx={{ height: '100%' }} >
              <CardContent>
                <Typography>Aqui estara a descrição da excursao</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography>Origem: {excursao?.destino}</Typography>
                <Typography>Destino: {excursao?.destino}</Typography>
                <Typography>Saída: {excursao?.dataIda?.format('DD/MM/YYYY')}</Typography>
                <Typography>Volta: {excursao?.dataVolta?.format('DD/MM/YYYY')}</Typography>
                <Typography>Valor: R$200.00</Typography>

                <List color='black'>
                  <Typography> Formas de Pagamento Aceitas:</Typography>
                  <Grid container xs={12} sm={12} >
                    {formasPagamento.map((item) => (
                      <Grid item key={item.id} xs={12} sm={12} md={6}>
                        <ListItem><BiDollarCircle size={20} />{item.descricao}</ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </List>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={12} md={6} spacing={2} >
          <Grid item xs={12}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                alt="Destination Image"
                height="100%"
                image={excursao?.imgUrl}
              />
            </Card>
          </Grid>
          <Grid item xs={12} >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Divulgador</Typography>
                <Typography>Nome: Douglas Rodrigues</Typography>
                <Typography>Contato: douglasr.comp@hotamil.com</Typography>
                {Avaliacao(4.3)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ExcursaoModal;