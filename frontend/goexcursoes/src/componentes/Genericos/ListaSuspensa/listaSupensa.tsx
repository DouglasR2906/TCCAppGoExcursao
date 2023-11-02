import React from "react";
import { ICategoria } from "types/categoria";
import styel from "./ListaSuspensa.module.scss";

interface Props {
  obrigatorio: boolean,
  label: string,
  itens: ICategoria[],
  valor: string,
  aoAlterado: React.Dispatch<React.SetStateAction<string>>
}

function ListaSuspensa({ obrigatorio, label, itens, valor, aoAlterado }: Props) {

  const aoSelecionado = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    if (aoAlterado) {
      aoAlterado(evento.target.value);
    }
  };

  return (
    <div className={styel.lista}>
      <label>{label}</label>
      <select onChange={aoSelecionado} required={obrigatorio} value={valor}>
        {itens.map((item) => <option key={item.idCategoria} className="option" value={item.descricaoCategoria}>{item.descricaoCategoria}</option>)}
      </select>
    </div>
  );
}

export default ListaSuspensa;