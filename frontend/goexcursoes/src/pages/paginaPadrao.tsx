import Cabecalho from "componentes/Genericos/Cabecalho/cabecalho";
import Rodape from "componentes/Genericos/Rodape/rodape";
import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
  return (
    <>
      <div>
        <Cabecalho posicao="fixed" exibirUsuario={true} />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Rodape />
      </div>
    </>
  );
}