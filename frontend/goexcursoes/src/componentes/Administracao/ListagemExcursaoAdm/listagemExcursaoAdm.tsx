import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useGet from "Api/useGet";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";
import { IExcursao } from "types/excursao";
import { IPaginacao } from "types/paginacao";

export default function ListagemExcursaoAdm() {
  const navigate = useNavigate();
  const [excursoes, setExcursoes] = useState<IExcursao[]>([]);
  const size = 8;
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // useEffect(() => {
  //   const params = {
  //     page: pagina,
  //     size: size,
  //     sort: "dataIdaExcursao"
  //   };
  //   useGet<IPaginacao<IExcursao>>({
  //     url: `excursao/usuario/${autenticacaoStore.usuario.idUsuario}`,
  //     token: autenticacaoStore.usuario.tokenUsuario,
  //     params: params
  //   })
  //     .then(resposta => {
  //       if (resposta.data) {
  //         setExcursoes(resposta.data.content as IExcursao[]);
  //         setTotalPaginas(resposta.data.totalPages);
  //       }
  //     })
  //     .catch(erro => {
  //       console.log(erro);
  //     });
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = {
      page: pagina === 0 ? 0 : pagina - 1,
      size: size,
      sort: "dataIdaExcursao"
    };
    useGet<IPaginacao<IExcursao>>({
      url: `excursao/usuario/${autenticacaoStore.usuario.idUsuario}`,
      token: autenticacaoStore.usuario.tokenUsuario,
      params: params
    })
      .then(resposta => {
        if (resposta.data) {
          setExcursoes(resposta.data.content as IExcursao[]);
          setTotalPaginas(resposta.data.totalPages);
        }
      })
      .catch(erro => {
        console.log(erro);
      })
      .finally();
  }, [pagina]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagina(value);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell align="left">Origem</TableCell>
            <TableCell align="left">Destino</TableCell>
            <TableCell align="center">Período</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="left">Reservas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {excursoes.map((excursao) => (
            <TableRow
              key={excursao.idExcursao}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">{excursao.tituloExcursao}</TableCell>
              <TableCell align="left">{excursao.cidadeOrigemExcursao}</TableCell>
              <TableCell align="left">{excursao.cidadeDestinoExcursao}</TableCell>
              <TableCell align="left">{dayjs(excursao.dataIdaExcursao).format("DD/MM/YYYY")} á {dayjs(excursao.dataVoltaExcursao).format("DD/MM/YYYY")}</TableCell>
              <TableCell align="right">R${excursao.valorExcursao.toFixed(2)}</TableCell>
              <TableCell align="center">
                <Button variant="text" onClick={() => navigate(`novo/${excursao.idExcursao}`)}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button variant="text" onClick={() => navigate(`/admin/reservas/${excursao.idExcursao}`)}>
                  <FormatListBulletedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack width="100%" marginBottom={1}>
        <Pagination
          count={totalPaginas}
          siblingCount={0}
          page={pagina}
          onChange={handleChange} sx={{ margin: "0 auto" }} />
      </Stack>
    </TableContainer>
  );
}