import { Grid } from '@mui/material'
import { Excursao } from '../../types/excursao'
import CardExcursao from '../Card'

interface Excursoes {
    excursoes: Excursao[]
}
const ExcursoesLista: React.FC<Excursoes> = ({ excursoes }) => {
    return (
        <>
            <h1 style={{textAlign: 'center'}}>
                Excursões Buscadas
            </h1>
            <Grid container spacing={2} style={{ margin: '2rem', padding: "1.5rem" }}>
                {excursoes.map((excursao, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <CardExcursao {...excursao} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ExcursoesLista;