import Formulario from "componentes/Excursoes/Formulario/formulario";
import Banner from "componentes/Genericos/Banner/banner";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import http from "http/http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Excursao } from "types/excursao";
import ExcursoesLista from "../Excursoes/ListaExcursoes/listaExcursoes";
dayjs.locale("pt-br");

function Inicio() {
  const navigate = useNavigate();
  const [excursoes, setExcursoes] = useState<Excursao[]>([]);

  // const [selecionada, setSelecionada] = useState<ExcursaoSelecionada>({
  //   idExcursao: 0,
  //   idUsuarioExcursao: 0,
  //   tituloExcursao: "",
  //   descricaoExcursao: "",
  //   valorExcursao: 0,
  //   cidadeOrigemExcursao: "",
  //   cidadeDestinoExcursao: "",
  //   dataIdaExcursao: "",
  //   dataVoltaExcursao: "",
  //   horaIdaExcursao: "",
  //   horaVoltaExcursao: "",
  //   idCategoriaExcursao: 0,
  //   canceladaExcursao: false,
  //   urlImagensExcursao: "",
  //   localEmbarqueExcursao: "",
  //   selecionada: false
  // });
  const [busca, setBusca] = useState({ busca: "", dataIda: dayjs(), dataVolta: dayjs() });

  useEffect(() => {
    window.scrollTo(0, 0);
    http.get<Excursao[]>("excursao")
      .then(resposta => {
        setExcursoes(resposta.data);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);

  // useEffect(() => {
  //   if (selecionada && selecionada.selecionada) {
  //     selecionarExcursao(selecionada);
  //   }
  // }, [selecionada]);

  const adicionaBusca = (busca: string, dataIda: Dayjs | null, dataVolta: Dayjs | null) => {
    if (dataIda && dataVolta) setBusca({ busca: busca, dataIda: dataIda, dataVolta: dataVolta });
  };

  function selecionarExcursao(idSelecionada: number) {

    if (idSelecionada) {
      navigate(`/excursaoPage/${idSelecionada}`);
    }

  }

  return (
    <div>
      <Banner />
      <Formulario adicionaBusca={adicionaBusca} />
      <ExcursoesLista excursoes={excursoes} selecionarExcursao={selecionarExcursao} />
    </div>
  );
}

export default Inicio;
