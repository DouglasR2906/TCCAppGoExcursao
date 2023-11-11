import { Grid } from "@mui/material";
import useGet from "Api/useGet";
import Banner from "componentes/Genericos/Banner/banner";
import Filtros from "componentes/Genericos/Filtros/filtros";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategoria } from "types/categoria";
import { IExcursao } from "types/excursao";
import { IPaginacao } from "types/paginacao";
import ExcursoesLista from "../../componentes/Excursoes/ListaExcursoes/listaExcursoes";
dayjs.locale("pt-br");

interface IBusca {
  cidadeDestino?: string | null;
  dataInicial?: string | null;
  dataFinal?: string | null;
  page?: number | null;
  size?: number | null;
  sort?: string | null;
}

function Inicio() {
  const navigate = useNavigate();
  const [excursoes, setExcursoes] = useState<IExcursao[]>([]);
  const [busca, setBusca] = useState<IBusca>({ cidadeDestino: "", dataInicial: "", dataFinal: "" });
  const [filtro, setFiltro] = useState<string>("Todos");
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [pagina, setPagina] = useState(0);
  const [size, setSize] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    useGet<IPaginacao<IExcursao>>({ url: "excursao" })
      .then(resposta => {
        if (resposta.data)
          setExcursoes(resposta.data.content as IExcursao[]);
      })
      .catch(erro => {
        console.log(erro);
      })
      .finally();
    useGet<ICategoria[]>({ url: "categoria" })
      .then(((response) => {
        if (response.data) setCategorias(response.data);
      }))
      .catch(erro => console.log("Erro busca categorias:", erro))
      .finally();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    useGet<IPaginacao<IExcursao>, IBusca>({
      url: "excursao/buscarFiltros",
      params: {
        cidadeDestino: busca.cidadeDestino ? busca.cidadeDestino : null,
        dataInicial: busca.dataInicial ? busca.dataInicial : null,
        dataFinal: busca.dataFinal ? busca.dataFinal : null,
        page: pagina,
        size: size
      }
    })
      .then(resposta => {
        if (resposta.data)
          setExcursoes(resposta.data.content as IExcursao[]);
      })
      .catch(erro => {
        console.log(erro);
      })
      .finally();
  }, [busca]);


  const adicionaBusca = (cidadeDestino: string, dataInicial: Dayjs | null, dataFinal: Dayjs | null) => {
    if (cidadeDestino === " ")
      setBusca({
        dataInicial: dataInicial?.format("YYYY-MM-DD"),
        dataFinal: dataFinal?.format("YYYY-MM-DD")
      });

    if (dataInicial && dataFinal)
      setBusca({
        cidadeDestino,
        dataInicial: dataInicial?.format("YYYY-MM-DD"),
        dataFinal: dataFinal?.format("YYYY-MM-DD")
      });
  };

  function selecionarExcursao(idSelecionada: number) {
    if (idSelecionada) {
      navigate(`/excursaoPage/${idSelecionada}`);
    }
  }

  const mudarDePagina = (novaPagina: number) => {
    setPagina(novaPagina);
  };

  return (
    <Grid >
      <Banner adicionaBusca={adicionaBusca} />
      <Filtros categorias={categorias} filtro={filtro} setFiltro={setFiltro} />
      <ExcursoesLista
        excursoes={excursoes}
        selecionarExcursao={selecionarExcursao}
        filtro={filtro}
        totalPaginas={totalPaginas}
        onPageChange={(novaPagina) => mudarDePagina(novaPagina)}
      />
    </Grid>
  );
}

export default Inicio;
