import React from 'react';
import { Modal, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Excursao } from '../../types/excursao';
interface Props {
    excursao: Excursao | undefined
    open: boolean
    onClose: () => void
}

const ExcursaoModal = ({ open, onClose, excursao }: Props) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ position: 'absolute', top: '5%', left: '5%', backgroundColor: 'white', borderRadius: '5px', width: '90%', height: '90%', padding: 16 }}>
                <Typography variant="h4">{excursao?.destino}</Typography>
                <Grid container spacing={2} style={{ marginBottom: '16px' }}>
                    <Grid item xs={6}>
                        <Card style={{ height: '100%' }}>
                            <Typography>{excursao?.destino} Aqui estara a descrição da excursao</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt="Destination Image"
                                height="240"
                                image={excursao?.imgUrl}
                            />
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography>Local de Partida: {excursao?.destino}</Typography>
                                <Typography>Destino: {excursao?.destino}</Typography>
                                <Typography>Data e Hora de Saída: {excursao?.dataIda?.format('DD/MM/YYYY')}</Typography>
                                <Typography>Data e Hora de Volta: {excursao?.dataVolta?.format('DD/MM/YYYY')}</Typography>
                                <Typography>Valor da Excursão: R$200.00</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Divulgador</Typography>
                                <Typography>Nome: Douglas Rodrigues</Typography>
                                <Typography>Contato: douglasr.comp@hotamil.com</Typography>
                                <Typography>Formas de Pagamento Aceitas: Cartão Débito / Cartão Crédito / Pix / Dinheiro </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Button variant="contained" onClick={onClose} style={{ position: 'absolute', bottom: 0, right: 0, margin: '10px' }}>
                    Fechar
                </Button>
            </div>
        </Modal>
    );
};

export default ExcursaoModal;