import Formulario from "componentes/Excursoes/Formulario/formulario";
import Banner from "componentes/Genericos/Banner/banner";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import http from "http/http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Excursao } from "types/excursao";
import ExcursoesLista from "../componentes/Excursoes/ListaExcursoes/listaExcursoes";
dayjs.locale("pt-br");


function Inicio() {
  const navigate = useNavigate();
  const [excursoes, setExcursoes] = useState<Excursao[]>([]);

  const [selecionada, setSelecionada] = useState<Excursao>({
    idExcursao: 0,
    idUsuarioExcursao: 0,
    tituloExcursao: "",
    descricaoExcursao: "",
    valorExcursao: 0,
    cidadeOrigemExcursao: "",
    cidadeDestinoExcursao: "",
    dataIdaExcursao: "",
    dataVoltaExcursao: "",
    horaIdaExcursao: "",
    horaVoltaExcursao: "",
    idCategoriaExcursao: 0,
    canceladaExcursao: false,
    urlImagensExcursao: "",
    localEmbarqueExcursao: "",
    selecionado: false
  });
  const [busca, setBusca] = useState({ busca: "", dataIda: dayjs(), dataVolta: dayjs() });

  useEffect(() => {
    http.get<Excursao[]>("excursao")
      .then(resposta => {
        setExcursoes(resposta.data);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);

  useEffect(() => {
    if (selecionada && selecionada.selecionado) {
      selecionarExcursao(selecionada);
    }
  }, [selecionada]);

  const adicionaBusca = (busca: string, dataIda: Dayjs | null, dataVolta: Dayjs | null) => {
    if (dataIda && dataVolta) setBusca({ busca: busca, dataIda: dataIda, dataVolta: dataVolta });
  };

  function selecionarExcursao(excursaoSelecionada: Excursao) {
    excursaoSelecionada.selecionado = !excursaoSelecionada.selecionado;
    setSelecionada(excursaoSelecionada);

    if (excursaoSelecionada.selecionado) {
      navigate(`/excursaoPage/${excursaoSelecionada.idExcursao}`);
    }

  }

  return (
    <div>
      <Banner />
      <Formulario adicionaBusca={adicionaBusca} excursaoSelecionada={selecionada} />
      <ExcursoesLista excursoes={excursoes} selecionarExcursao={selecionarExcursao} />
    </div>
  );
}

export default Inicio;
