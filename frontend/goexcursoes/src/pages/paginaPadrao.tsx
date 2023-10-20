import Cabecalho from "componentes/Cabecalho/cabecalho";
import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
  return (
    <>
      <div>
        <Cabecalho />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}