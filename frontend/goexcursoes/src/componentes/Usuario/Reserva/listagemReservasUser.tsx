
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useGet from "Api/useGet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";
import { IPaginacao } from "types/paginacao";
import { IReservaListagem, statusReserva } from "types/reserva";

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

export default function ListagemReservasUser() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState<IReservaListagem[]>([]);
  useEffect(() => {
    useGet<IPaginacao<IReservaListagem>>({ url: `reserva/usuario/${autenticacaoStore.usuario.idUsuario}`, token: autenticacaoStore.usuario.tokenUsuario })
      .then(resposta => {
        if (resposta.data) {
          setReservas(resposta.data.content);
        }
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
            <TableCell>Excursão</TableCell>
            <TableCell align="left">Destino</TableCell>
            <TableCell align="center">Quantidade Viajantes</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell align="center">Forma de Pagamento</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Detalhes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservas.map((reserva) => (
            <TableRow
              key={reserva.idReserva}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">{reserva.tituloExcursaoReserva}</TableCell>
              <TableCell align="left">{reserva.destinoExcursaoReserva}</TableCell>
              <TableCell align="center">{reserva.qtdViajantesReserva}</TableCell>
              <TableCell align="right">R${reserva.valorTotalReserva.toFixed(2)}</TableCell>
              <TableCell align="center">{reserva.formaPagtoReserva}</TableCell>
              <TableCell align="center"
                sx={{ color: reserva.statusReserva === 0 ? "orange" : reserva.statusReserva === 1 ? "red" : "green", fontWeight: "50px" }}>
                {statusReserva[reserva.statusReserva]}
              </TableCell>
              <TableCell align="center">
                <Button variant="text" onClick={() => navigate(`/usuario/reservas/${reserva.idReserva}`)}>
                  <FormatListBulletedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}