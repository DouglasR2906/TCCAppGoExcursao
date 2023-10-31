import Cabecalho from "componentes/Genericos/Cabecalho/cabecalho";
import Rodape from "componentes/Genericos/Rodape/rodape";
import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
  return (
    <div style={{ height: "100vh" }}>
      <Cabecalho posicao="fixed" exibirUsuario={true} />
      <div style={{ paddingTop: "64px" }}>
        <Outlet />
        <Rodape />
      </div>
    </div>
  );
}