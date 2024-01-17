import CadastroExcursaoAdm from "componentes/Administracao/CadastroExcursaoAdm/cadastroExcursaoAdm";
import ListagemExcursaoAdm from "componentes/Administracao/ListagemExcursaoAdm/listagemExcursaoAdm";
import DetalhesReserva from "componentes/Reserva/DetalhesReserva/detalhesReserva";
import ListagemReservas from "componentes/Reserva/ListagemReservas/listagemReservas";
import CadastrarUsuario from "componentes/Usuario/CadastrarUsuario/cadastrarUsuarioUser";
import DadosCadastro from "componentes/Usuario/DadosCadastrais/dadoCadastraisUser";
import Login from "componentes/Usuario/Login/loginUser";
import ExcursaoPage from "pages/ExcursaoPage/excursaoPage";
import Inicio from "pages/Home/home";
import PaginaPadraoAdm from "pages/PaginaPadraoAdm/paginaPadraoAdm";
import PaginaPadrao from "pages/PaginaPadraoExcursao/paginaPadrao";
import PaginaPadraoUser from "pages/PaginaPadraoUsuario/paginaPadraoUser";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RotaPrivada from "utils/rotaPrivada";

export default function AppRoutes() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route path='/' element={<Inicio />} />
          <Route path='/excursaoPage/:id' element={<ExcursaoPage />} />
        </Route>
        <Route element={<RotaPrivada />}>
          <Route path="/admin" element={<PaginaPadraoAdm />}>
            <Route path="/admin/" element={<ListagemExcursaoAdm />} />
            <Route path="/admin/novo" element={<CadastroExcursaoAdm />} />
            <Route path="/admin/novo/:id" element={<CadastroExcursaoAdm />} />
            <Route path="/admin/reservas/:id" element={<ListagemReservas />} />
            <Route path="/admin/reserva/:idReserva/:reservaDeExcursao" element={<DetalhesReserva />} />
          </Route>
          <Route path="/usuario" element={<PaginaPadraoUser />}>
            <Route path="/usuario/" element={<DadosCadastro />} />
            <Route path="/usuario/reservas" element={<ListagemReservas />} />
            <Route path="/usuario/reserva/:idReserva" element={<DetalhesReserva />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroUsuario" element={<CadastrarUsuario />} />
      </Routes>
    </Router>
  );
}