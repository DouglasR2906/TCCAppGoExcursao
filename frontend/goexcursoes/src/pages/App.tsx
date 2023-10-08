import { useEffect, useState } from "react";
import Banner from "../componentes/Banner/banner";
import Formulario from "../componentes/Formulario/formulario";
import { Excursao as excursao } from "../types/excursao";
import ExcursoesLista from "../componentes/ListaExcursoes/listaExcursoes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExcursaoModal from "../componentes/ModalExcursao/modalExcursao";
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";
dayjs.locale('pt-br');


function App() {
  const [open, setOpen] = useState(false);
  const [busca, setBusca] = useState<excursao[]>([{
    id: '1',
    destino: 'Formiga MG',
    dataIda: dayjs('08/10/2023'),
    dataVolta: dayjs('09/10/2023'),
    categoria: 'Eventos',
    imgUrl: 'https://encurtador.com.br/kuADQ',
    selecionado: false
  }, {
    id: '2',
    destino: 'Belo Horizonte MG',
    dataIda: dayjs('09/10/2023'),
    dataVolta: dayjs('10/10/2023'),
    categoria: 'Shows',
    imgUrl: 'https://encurtador.com.br/isEM6',
    selecionado: false
  },
  {
    id: '3',
    destino: 'Fortaleza CE',
    dataIda: dayjs('11/10/2023'),
    dataVolta: dayjs('12/10/2023'),
    categoria: 'Lazer',
    imgUrl: 'https://encurtador.com.br/alAHJ',
    selecionado: false
  },
  {
    id: '4',
    destino: 'São Paulo SP',
    dataIda: dayjs('13/10/2023'),
    dataVolta: dayjs('14/10/2023'),
    categoria: 'Concurso',
    imgUrl: 'https://encurtador.com.br/amnT7',
    selecionado: false
  }]);
  const [selecionada, setSelecionada] = useState<excursao>();

  useEffect(() => {
    console.log("open: ", open, selecionada);
    
    if (!open && selecionada && selecionada?.selecionado) {
      setSelecionada({...selecionada,
        selecionado: false,
      });
    };

  }, [open, selecionada]);

  const adicionaBusca = (buscarExcursoes: excursao) => {
    const uuid = crypto.randomUUID();
    setBusca(buscasAntigas => [...buscasAntigas, { ...buscarExcursoes, selecionado: false, id: uuid }]);
  };

  function selecionarExcursao(excursaoSelecionada: excursao) {
    excursaoSelecionada.selecionado = !excursaoSelecionada.selecionado;
    setSelecionada(excursaoSelecionada);
    setBusca(buscasAnteriores => buscasAnteriores.map(excursao => ({
      ...excursao,
      selecionado: excursao.id === excursaoSelecionada.id && !excursao.selecionado ? true : false
    }))
    );
    if (excursaoSelecionada.selecionado) {
      setOpen(true);
    }
  }

  const fecharModal = () => {
    setOpen(false)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <Banner />
        <Formulario adicionaBusca={adicionaBusca} excursaoSelecionada={selecionada} />
        <ExcursoesLista excursoes={busca} selecionarExcursao={selecionarExcursao} />
        <ExcursaoModal excursao={selecionada} open={open} onClose={fecharModal} />
      </div>
    </LocalizationProvider>
  )
}

export default App;
