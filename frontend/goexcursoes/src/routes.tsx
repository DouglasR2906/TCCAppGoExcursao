import CadastroExcursaoAdm from "componentes/Administracao/CadastroExcursaoAdm/cadastroExcursaoAdm";
import ListagemExcursaoAdm from "componentes/Administracao/ListagemExcursaoAdm/listagemExcursaoAdm";
import Inicio from "componentes/Home/inicio";
import Login from "componentes/Usuario/Login/login";
import ExcursaoPage from "pages/ExcursaoPage/excursaoPage";
import PaginaPadraoAdm from "pages/PaginaPadraoAdm/paginaPadraoAdm";
import PaginaPadrao from "pages/PaginaPadraoExcursao/paginaPadrao";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route path='/' element={<Inicio />} />
          <Route path='/excursaoPage/:id' element={<ExcursaoPage />} />
        </Route>
        <Route path="/admin" element={<PaginaPadraoAdm />}>
          <Route path="/admin/" element={<ListagemExcursaoAdm />} />
          <Route path="/admin/novo" element={<CadastroExcursaoAdm />} />
          <Route path="/admin/novo/:id" element={<CadastroExcursaoAdm />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}