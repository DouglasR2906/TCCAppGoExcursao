import { Grid } from '@mui/material'
import { Excursao } from '../../types/excursao'
import CardExcursao from '../Card/card'

interface Props {
    excursoes: Excursao[]
    selecionarExcursao: (excursaoSelecionada: Excursao) => void
}
const ExcursoesLista: React.FC<Props> = ({ excursoes, selecionarExcursao }) => {
    return (
        <>
            <h1 style={{textAlign: 'center'}}>
                Excursões Buscadas
            </h1>
            <Grid container spacing={2} style={{ marginTop: '2rem' , padding: "1.5rem" }}>
                {excursoes.map((excursao) => (
                    <Grid item key={excursao.id} xs={12} sm={6} md={3} lg={3}>
                        <CardExcursao {...excursao} selecionarExcursao ={selecionarExcursao}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ExcursoesLista;