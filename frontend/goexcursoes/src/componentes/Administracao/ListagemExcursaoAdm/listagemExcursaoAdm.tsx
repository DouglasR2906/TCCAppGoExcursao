
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import http from "http/http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Excursao } from "types/excursao";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ListagemExcursaoAdm() {
  const navigate = useNavigate();
  const [excursoes, setExcursoes] = useState<Excursao[]>([]);
  useEffect(() => {
    http.get<Excursao[]>("excursao")
      .then(resposta => {
        setExcursoes(resposta.data);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell align="right">Destino</TableCell>
            <TableCell align="right">Origem</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell align="right">Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {excursoes.map((excursao) => (
            <TableRow
              key={excursao.idExcursao}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">{excursao.tituloExcursao}</TableCell>
              <TableCell align="right">{excursao.cidadeDestinoExcursao}</TableCell>
              <TableCell align="right">{excursao.cidadeOrigemExcursao}</TableCell>
              <TableCell align="right">R${excursao.valorExcursao.toFixed(2)}</TableCell>
              <TableCell align="right">
                <Button variant="text" sx={{ borderRadius: "50%" }} onClick={() => navigate(`novo/${excursao.idExcursao}`)}>
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}