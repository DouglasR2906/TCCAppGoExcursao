import { useEffect, useState } from 'react';
import Banner from 'componentes/Banner/banner';
import Formulario from 'componentes/Formulario/formulario';
import { Excursao } from 'types/excursao';
import  excursao  from 'data/excursao.json';
import ExcursoesLista from '../componentes/ListaExcursoes/listaExcursoes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ExcursaoModal from '../componentes/ModalExcursao/modalExcursao';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
dayjs.locale('pt-br');


function App() {
  const excursaoList = excursao.map(item => ({...item, dataIda: dayjs(item.dataIda),dataVolta: dayjs(item.dataVolta),}));

  const [open, setOpen] = useState(false);
  const [selecionada, setSelecionada] = useState<Excursao>();
  const [busca, setBusca] = useState(excursaoList);
  

  useEffect(() => {
    console.log('open: ', open, selecionada);
    
    if (!open && selecionada && selecionada.selecionado) {
      selecionarExcursao(selecionada);
    }

  }, [open, selecionada]);

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
      setOpen(true);
    }
  }

  const fecharModal = () => {
    setOpen(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <Banner />
        <Formulario adicionaBusca={adicionaBusca} excursaoSelecionada={selecionada} />
        <ExcursoesLista excursoes={busca} selecionarExcursao={selecionarExcursao} />
        <ExcursaoModal excursao={selecionada} open={open} onClose={fecharModal} />
      </div>
    </LocalizationProvider>
  );
}

export default App;
