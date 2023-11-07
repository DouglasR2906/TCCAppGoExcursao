import CadastroExcursaoAdm from "componentes/Administracao/CadastroExcursaoAdm/cadastroExcursaoAdm";
import ListagemExcursaoAdm from "componentes/Administracao/ListagemExcursaoAdm/listagemExcursaoAdm";
import CadastrarUsuario from "componentes/Usuario/CadastrarUsuario/cadastrarUsuarioUser";
import DadosCadastro from "componentes/Usuario/DadosCadastrais/dadoCadastraisUser";
import Login from "componentes/Usuario/Login/loginUser";
import ListagemReservasUser from "componentes/Usuario/Reserva/listagemReservasUser";
import ExcursaoPage from "pages/ExcursaoPage/excursaoPage";
import Inicio from "pages/Home/inicio";
import PaginaPadraoAdm from "pages/PaginaPadraoAdm/paginaPadraoAdm";
import PaginaPadrao from "pages/PaginaPadraoExcursao/paginaPadrao";
import PaginaPadraoUser from "pages/PaginaPadraoUsuario/paginaPadraoUser";
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
        <Route path="/usuario" element={<PaginaPadraoUser />}>
          <Route path="/usuario/" element={<DadosCadastro />} />
          <Route path="/usuario/reservas" element={<ListagemReservasUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroUsuario" element={<CadastrarUsuario />} />
      </Routes>
    </Router>
  );
}