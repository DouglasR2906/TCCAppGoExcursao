import React, { useState } from "react";
import CampoData from "../../Genericos/CampoData/campoData";
import CampoTexto from "../../Genericos/CampoTexto/campoTexto";
import ListaSuspensa from "../../Genericos/ListaSuspensa/listaSupensa";
import style from "./Formulario.module.scss";
import Botao from "../../Genericos/Botao/botao";
import { Excursao } from "../../../types/excursao";
import { Container } from "@mui/material";
import { GrSearch } from "react-icons/gr";

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
    horaIda: "",
    dataVolta: "",
    horaVolta: "",
    categoria: "",
    imgUrl: "",
    localEmbarque: "",
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
      horaIda: "",
      dataVolta: "",
      horaVolta: "",
      categoria: "",
      imgUrl: "",
      localEmbarque: "",
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
              aoAlteradoData={dataIda => setBusca({ ...busca, dataIda })}
            />
            <CampoData
              obrigatorio={true}
              label="Data de Volta"
              aoAlteradoData={dataVolta => setBusca({ ...busca, dataVolta })}
            />
          </div>

          {/* <ListaSuspensa
            icone=""
            obrigatorio={true}
            label="Categorias"
            placeholder=""
            itens={itens}
            valor={busca.categoria}
            aoAlterado={categoria => setBusca({ ...busca, categoria })}
          /> */}
          <Botao type="submit"> Buscar <GrSearch size={15} /></Botao>
        </Container>
      </form>
    </section>
  );
}

export default Formulario;