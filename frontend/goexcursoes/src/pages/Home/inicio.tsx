import { Grid } from "@mui/material";
import useGet from "Api/useGet";
import Formulario from "componentes/Excursoes/Formulario/formulario";
import Banner from "componentes/Genericos/Banner/banner";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IExcursao } from "types/excursao";
import ExcursoesLista from "../../componentes/Excursoes/ListaExcursoes/listaExcursoes";
dayjs.locale("pt-br");

function Inicio() {
  const navigate = useNavigate();
  const [excursoes, setExcursoes] = useState<IExcursao[]>([]);
  const [busca, setBusca] = useState({ busca: "", dataIda: dayjs(), dataVolta: dayjs() });

  useEffect(() => {
    window.scrollTo(0, 0);
    useGet<IExcursao[]>({ url: "excursao" })
      .then(resposta => {
        setExcursoes(resposta.data as IExcursao[]);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);

  const adicionaBusca = (busca: string, dataIda: Dayjs | null, dataVolta: Dayjs | null) => {
    if (dataIda && dataVolta) setBusca({ busca: busca, dataIda: dataIda, dataVolta: dataVolta });
  };

  function selecionarExcursao(idSelecionada: number) {

    if (idSelecionada) {
      navigate(`/excursaoPage/${idSelecionada}`);
    }

  }

  return (
    <Grid height="100%">
      <Banner />
      <Formulario adicionaBusca={adicionaBusca} />
      <ExcursoesLista excursoes={excursoes} selecionarExcursao={selecionarExcursao} />
    </Grid>
  );
}

export default Inicio;
