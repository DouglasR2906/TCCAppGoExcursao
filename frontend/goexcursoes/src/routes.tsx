import CadastroExcursaoAdm from "componentes/Administracao/CadastroExcursaoAdm/cadastroExcursaoAdm";
import ListagemExcursaoAdm from "componentes/Administracao/ListagemExcursaoAdm/listagemExcursaoAdm";
import PaginaPadraoAdm from "componentes/Administracao/PaginaPadraoAdm/paginaPadraoAdm";
import ExcursaoPage from "componentes/Excursoes/excursaoPage";
import Inicio from "pages/inicio";
import PaginaPadrao from "pages/paginaPadrao";
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

      </Routes>
    </Router>
  );
}