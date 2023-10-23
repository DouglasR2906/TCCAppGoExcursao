import Rodape from "componentes/Genericos/Rodape/rodape";
import ExcursaoPage from "pages/excursaoPage";
import Inicio from "pages/inicio";
import PaginaPadrao from "pages/paginaPadrao";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path="/" element={<PaginaPadrao />}>
          <Route path='/excursaoPage/:id' element={<ExcursaoPage />} />
        </Route>
        {/* <Route path="/admin/:user" element={<Admim />} /> */}
      </Routes>
      <Rodape />
    </Router>
  );
}