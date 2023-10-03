import { useState } from "react";
import Banner from "../componentes/Banner";
import Formulario from "../componentes/Formulario";
import { Excursao as excursao} from "../types/excursao";
import ExcursoesLista from "../componentes/ExcursoesLista";

function App() {
  const [busca, setBusca] = useState<excursao[]>([]);

  const adicionaBusca = (buscarExcursoes: excursao) => {
    setBusca([...busca, buscarExcursoes]);
    console.log("Array Buscas:", busca);
  };
  return (
    <div>
      <Banner/>
      <Formulario adicionaBusca={adicionaBusca}/>
      <ExcursoesLista excursoes={busca}/>
    </div>
  );
}

export default App;
