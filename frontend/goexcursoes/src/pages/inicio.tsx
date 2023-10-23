import { useEffect, useState } from "react";
import Banner from "componentes/Genericos/Banner/banner";
import Formulario from "componentes/Excursoes/Formulario/formulario";
import { Excursao } from "types/excursao";
import excursao from "data/excursao.json";
import ExcursoesLista from "../componentes/Excursoes/ListaExcursoes/listaExcursoes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
dayjs.locale("pt-br");


function Inicio() {
  const navigate = useNavigate();
  const [selecionada, setSelecionada] = useState<Excursao>();
  const [busca, setBusca] = useState(excursao);


  useEffect(() => {
    if (selecionada && selecionada.selecionado) {
      selecionarExcursao(selecionada);
    }
  }, [selecionada]);

  const adicionaBusca = (buscarExcursoes: Excursao) => {
    const uuid = crypto.randomUUID();
    setBusca(buscasAntigas => [...buscasAntigas, { ...buscarExcursoes, selecionado: false, id: uuid }]);
  };

  function selecionarExcursao(excursaoSelecionada: Excursao) {
    excursaoSelecionada.selecionado = !excursaoSelecionada.selecionado;
    setSelecionada(excursaoSelecionada);
    setBusca(buscasAnteriores => buscasAnteriores.map(excursao => ({
      ...excursao,
      selecionado: excursao.id === excursaoSelecionada.id && !excursao.selecionado ? true : false
    }))
    );
    if (excursaoSelecionada.selecionado) {
      navigate(`/excursaoPage/${excursaoSelecionada.id}`);
    }

  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <Banner />
        <Formulario adicionaBusca={adicionaBusca} excursaoSelecionada={selecionada} />
        <ExcursoesLista excursoes={busca} selecionarExcursao={selecionarExcursao} />
      </div>
    </LocalizationProvider>
  );
}

export default Inicio;
