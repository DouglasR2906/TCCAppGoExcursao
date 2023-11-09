import { Navigate, Outlet } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";

function RotaPrivada() {
  const { estaAutenticado } = autenticacaoStore;

  return (
    estaAutenticado ? <Outlet /> : <Navigate to="/login" />
  );

}

export default RotaPrivada;