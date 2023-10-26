import { Container } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { Excursao } from "../../../types/excursao";
import Botao from "../../Genericos/Botao/botao";
import CampoData from "../../Genericos/CampoData/campoData";
import CampoTexto from "../../Genericos/CampoTexto/campoTexto";
import style from "./Formulario.module.scss";

interface Props {
  adicionaBusca: (busca: string, dataIda: Dayjs | null, dataVolta: Dayjs | null) => void
  excursaoSelecionada: Excursao | undefined
}

function Formulario({ adicionaBusca }: Props) {
  const [busca, setBusca] = useState("");
  const [dataIda, setDataIda] = useState<Dayjs | null>(dayjs());
  const [dataVolta, setDataVolta] = useState<Dayjs | null>(dayjs());

  const aoSalvar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionaBusca(busca, dataIda, dataVolta);
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
            valor={busca}
            aoAlterado={setBusca}
          />
          <div className={style.datacontainer}>
            <CampoData
              obrigatorio={true}
              label="Data de Ida"
              valor={dataIda}
              setData={setDataIda}
            />
            <CampoData
              obrigatorio={true}
              label="Data de Volta"
              valor={dataVolta}
              setData={setDataVolta}
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