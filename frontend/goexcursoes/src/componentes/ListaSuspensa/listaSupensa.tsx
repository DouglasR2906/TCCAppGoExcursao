import React from "react";
import styel from "./ListaSuspensa.module.scss";
import { InputTextoProps } from "../../types/inputTexto";

interface Props extends InputTextoProps{
  itens: string[]
}

function ListaSuspensa({ obrigatorio, label, itens, valor, aoAlterado }: Props) {

  const aoSelecionado = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    if (aoAlterado){
      aoAlterado(evento.target.value);
    }
  };

  return (
    <div className={styel.lista}>
      <label>{label}</label>
      <select onChange={aoSelecionado} required={obrigatorio} value={valor}>
        {itens.map((item, index) => <option key={index} className="option" value={item}>{item}</option>)}
      </select>
    </div>
  );
}

export default ListaSuspensa;