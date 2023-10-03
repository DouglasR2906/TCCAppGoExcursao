import React from 'react';
import style from './CampoTexto.module.scss'
import { InputProps } from '../../types/input';


function CampoTexto ({obrigatorio, label, placeholder, valor, aoAlterado}: InputProps) {
  
  const aoDigitado = (evento: React.ChangeEvent<HTMLInputElement>) => {
    aoAlterado(evento.target.value);
  }

  return (
    <div className={style.campotexto}>
      <label>{label}</label>
      <input value={valor} onChange={aoDigitado} required={obrigatorio} placeholder={placeholder} /> 
    </div>
  );
};

export default CampoTexto;