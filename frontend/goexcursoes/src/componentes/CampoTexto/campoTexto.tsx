import React from 'react';
import style from './CampoTexto.module.scss'
import { InputTextoProps } from '../../types/inputTexto';

function CampoTexto ({obrigatorio, label, placeholder, valor, aoAlterado}: InputTextoProps) {
  
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