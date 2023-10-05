import React, { useState } from "react";
import CampoData from "../CampoData";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";
import style from "./Formulario.module.scss";
import Botao from "../Botao";
import { Excursao as excursao } from '../../types/excursao'
import dayjs from "dayjs";

function Formulario({ adicionaBusca }: { adicionaBusca: (buscarExcursoes: excursao) => void }) {
  const itens = ["", "Lazer", "Shows", "Eventos", "Concursos"];
  const [busca, setBusca] = useState<excursao>({
    destino: '',
    dataIda: dayjs(),
    dataVolta: dayjs(),
    categoria: '',
    imgUrl: ''
  });


  const aoSalvar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    console.log("Botao buscar clicado =>", busca.destino, busca.dataIda, busca.dataVolta, busca.categoria)

    setBusca({
      destino: '',
      dataIda: dayjs(),
      dataVolta: dayjs(),
      categoria: '',
      imgUrl: ''
    })

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