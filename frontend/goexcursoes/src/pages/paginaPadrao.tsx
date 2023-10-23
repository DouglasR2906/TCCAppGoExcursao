import Cabecalho from "componentes/Genericos/Cabecalho/cabecalho";
import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
  return (
    <>
      <div>
        <Cabecalho bgColor="white" posicao="fixed" />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}