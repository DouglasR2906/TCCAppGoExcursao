import React from "react";
import style from './CampoData.module.scss'
import { InputDataProps } from '../../types/inputData';

function CampoData({ obrigatorio, label, valorData, aoAlteradoData }: InputDataProps) {

  const aoDigitado = (evento: React.ChangeEvent<HTMLInputElement>) => {
    aoAlteradoData(evento.target.value);
  }

  return (
    <div className={style.campodata}>
      <label>{label}</label>
      <input value={valorData} onChange={aoDigitado}  required={obrigatorio}/>
    </div>
  );
};

export default CampoData;