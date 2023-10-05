import { useState } from "react";
import Banner from "../componentes/Banner";
import Formulario from "../componentes/Formulario";
import { Excursao as excursao } from "../types/excursao";
import ExcursoesLista from "../componentes/ExcursoesLista";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [busca, setBusca] = useState<excursao[]>([]);

  const adicionaBusca = (buscarExcursoes: excursao) => {
    setBusca([...busca, buscarExcursoes]);
    console.log("Array Buscas:", busca);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <Banner />
        <Formulario adicionaBusca={adicionaBusca} />
        <ExcursoesLista excursoes={busca} />
      </div>
    </LocalizationProvider>
  )
}

export default App;
