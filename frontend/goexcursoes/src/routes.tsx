import ExcursaoPage from "pages/excursaoPage";
import Inicio from "pages/inicio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/excursaoPage' element={<ExcursaoPage />} />
      </Routes>
    </Router>
  );
}