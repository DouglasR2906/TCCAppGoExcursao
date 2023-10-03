import React from "react";
import styel from "./ListaSuspensa.module.scss"
import { InputProps } from "../../types/input";

interface Props extends InputProps{
  itens: string[]
}

function ListaSuspensa({ obrigatorio, label, itens, valor, aoAlterado }: Props) {

  const aoSelecionado = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    aoAlterado(evento.target.value);
  }

  return (
    <div className={styel.lista}>
      <label>{label}</label>
      <select onChange={aoSelecionado} required={obrigatorio} value={valor}>
        {itens.map((item, index) => <option key={index} className="option" value={item}>{item}</option>)}
      </select>
    </div>
  );
};

export default ListaSuspensa;