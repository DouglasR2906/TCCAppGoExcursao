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
  const [busca, setBusca] = useState<IBusca>({ cidadeDestino: null, dataInicial: null, dataFinal: null });
  const [filtro, setFiltro] = useState<string>("Todos");
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [pagina, setPagina] = useState(0);
  const size = 4;
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [categoriasCarregadas, setCategoriasCarregadas] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setBusca({});
    useGet<ICategoria[]>({ url: "categoria" })
      .then(((response) => {
        if (response.data) {
          setCategorias(response.data);
          setCategoriasCarregadas(true);
        }
      }))
      .catch(erro => console.log("Erro busca categorias:", erro))
      .finally();
  }, []);

  useEffect(() => {
    if (pagina === 0) window.scrollTo(0, 0);
    const params = {
      cidadeDestino: busca.cidadeDestino ? busca.cidadeDestino : null,
      dataInicial: busca.dataInicial ? busca.dataInicial : null,
      dataFinal: busca.dataFinal ? busca.dataFinal : null,
      page: pagina,
      size: size,
      sort: "dataIdaExcursao"
    };
    useGet<IPaginacao<IExcursao>, IBusca>({
      url: "excursao/buscarFiltros",
      params: params
    })
      .then(resposta => {
        if (resposta.data) {
          const novasExcursoes = resposta.data.content as IExcursao[];
          if (pagina === 0) {
            setExcursoes(novasExcursoes);
          } else {
            setExcursoes(excursoesAnt => [...excursoesAnt, ...novasExcursoes]);
          }
          setTotalPaginas(resposta.data.totalPages);
        }
      })
      .catch(erro => {
        console.log(erro);
      })
      .finally();
  }, [busca, pagina]);

  const adicionaBusca = (cidadeDestino: string, dataInicial: Dayjs | null, dataFinal: Dayjs | null) => {
    setPagina(0);
    console.log("busca", cidadeDestino);

    if (cidadeDestino === "")
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

  const carregarMais = () => {
    if (pagina < (totalPaginas - 1)) setPagina(pagina + 1);
  };



  return (
    <Grid >
      <Banner adicionaBusca={adicionaBusca} />
      <Filtros categorias={categorias} filtro={filtro} setFiltro={setFiltro} />
      <ExcursoesLista
        excursoes={excursoes}
        selecionarExcursao={selecionarExcursao}
        filtro={filtro}
        paginaAtual={pagina}
        totalPaginas={totalPaginas}
        onPageChange={() => carregarMais()}
      />
    </Grid>
  );
}

export default Inicio;
