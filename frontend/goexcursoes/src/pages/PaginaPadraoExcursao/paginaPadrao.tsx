import { Box, CssBaseline } from "@mui/material";
import Cabecalho from "componentes/Genericos/Cabecalho/cabecalho";
import Rodape from "componentes/Genericos/Rodape/rodape";
import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <Cabecalho posicao="fixed" exibirUsuario={true} />
      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100", marginTop: 8 }}
      >
        <Outlet />
      </Box>
      <Box
        component="footer"
        sx={{ flexGrow: 1, width: "100%", height: "100%" }}
      >
        <Rodape />
      </Box>
    </Box>
  );
}






// export default function PaginaPadrao() {
//   return (
//     <div >
//       <Cabecalho posicao="fixed" exibirUsuario={true} />
//       <Outlet />
//       <Rodape />
//     </div>
//   );
// }