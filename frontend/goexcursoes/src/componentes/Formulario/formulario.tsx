import React, { useState } from "react";
import CampoData from "../CampoData/campoData";
import CampoTexto from "../CampoTexto/campoTexto";
import ListaSuspensa from "../ListaSuspensa/listaSupensa";
import style from "./Formulario.module.scss";
import Botao from "../Botao/botao";
import { Excursao } from '../../types/excursao'
import dayjs from "dayjs";

interface Props {
  adicionaBusca: (buscarExcursao: Excursao) => void
  excursaoSelecionada: Excursao | undefined
}

function Formulario({ adicionaBusca }: Props) {
  const itens = ["", "Lazer", "Shows", "Eventos", "Concursos"];
  const [busca, setBusca] = useState<Excursao>({
    id: '',
    destino: '',
    dataIda: dayjs(),
    dataVolta: dayjs(),
    categoria: '',
    imgUrl: '',
    selecionado: false
  });

  const aoSalvar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    setBusca({
      id: '',
      destino: '',
      dataIda: dayjs(),
      dataVolta: dayjs(),
      categoria: '',
      imgUrl: '',
      selecionado: false
    });

    adicionaBusca(busca);
  };
  return (
    <section className={style.formulario} onSubmit={aoSalvar}>
      <form>
        <CampoTexto
          obrigatorio={true}
          label="Buscar Destino"
          placeholder="Pra onde vai?"
          valor={busca.destino}
          aoAlterado={destino => setBusca({ ...busca, destino })}
        />
        <div className={style.datacontainer}>
          <CampoData
            obrigatorio={true}
            label="Data de Ida"
            placeholder="00/00/0000"
            valorData={busca.dataIda}
            aoAlteradoData={dataIda => setBusca({ ...busca, dataIda })}
          />
          <CampoData
            obrigatorio={true}
            label="Data de Volta"
            placeholder="00/00/0000"
            valorData={busca.dataVolta}
            aoAlteradoData={dataVolta => setBusca({ ...busca, dataVolta })}
          />
        </div>

        <CampoTexto
          obrigatorio={true}
          label="Imagem"
          placeholder="URL da imagem do destino"
          valor={busca.imgUrl}
          aoAlterado={imgUrl => setBusca({ ...busca, imgUrl })}
        />

        <ListaSuspensa
          obrigatorio={true}
          label="Categorias"
          placeholder="Lazer, Show, Evento..."
          itens={itens}
          valor={busca.categoria}
          aoAlterado={categoria => setBusca({ ...busca, categoria })}
        />
        <Botao type='submit'>Buscar</Botao>
      </form>
    </section>
  );
};

export default Formulario;