import React, { useState } from "react";
import CampoData from "../CampoData/campoData";
import CampoTexto from "../CampoTexto/campoTexto";
import ListaSuspensa from "../ListaSuspensa/listaSupensa";
import style from "./Formulario.module.scss";
import Botao from "../Botao/botao";
import { Excursao } from "../../types/excursao";
import dayjs from "dayjs";
import { Container } from "@mui/material";

interface Props {
  adicionaBusca: (buscarExcursao: Excursao) => void
  excursaoSelecionada: Excursao | undefined
}

function Formulario({ adicionaBusca }: Props) {
  const itens = ["", "Lazer", "Shows", "Eventos", "Concursos"];
  const [busca, setBusca] = useState<Excursao>({
    id: "",
    titulo: "",
    origem: "",
    destino: "",
    dataIda: "",
    dataVolta: "",
    categoria: "",
    imgUrl: "",
    valorTotal: 0,
    selecionado: false
  });

  const aoSalvar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    setBusca({
      id: "",
      titulo: "",
      origem: "",
      destino: "",
      dataIda: "",
      dataVolta: "",
      categoria: "",
      imgUrl: "",
      valorTotal: 0,
      selecionado: false
    });

    adicionaBusca(busca);
  };
  return (
    <section className={style.formulario} onSubmit={aoSalvar}>
      <form>
        <Container>
          <CampoTexto
            icone="busca"
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
              valorData={busca.dataIda}
              aoAlteradoData={dataIda => setBusca({ ...busca, dataIda })}
            />
            <CampoData
              obrigatorio={true}
              label="Data de Volta"
              valorData={busca.dataVolta}
              aoAlteradoData={dataVolta => setBusca({ ...busca, dataVolta })}
            />
          </div>

          <CampoTexto
            icone=""
            obrigatorio={true}
            label="Imagem"
            placeholder="URL da imagem do destino"
            valor={busca.imgUrl}
            aoAlterado={imgUrl => setBusca({ ...busca, imgUrl })}
          />

          <ListaSuspensa
            icone=""
            obrigatorio={true}
            label="Categorias"
            placeholder=""
            itens={itens}
            valor={busca.categoria}
            aoAlterado={categoria => setBusca({ ...busca, categoria })}
          />
          <Botao type="submit">Buscar</Botao>
        </Container>
      </form>
    </section>
  );
}

export default Formulario;