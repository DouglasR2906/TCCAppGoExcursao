import React from 'react';
import style from './CampoTexto.module.scss';
import { InputTextoProps } from '../../types/inputTexto';
import { FaLocationDot } from 'react-icons/fa6';

function CampoTexto({ icone, obrigatorio, label, placeholder, valor, aoAlterado }: InputTextoProps) {

  const aoDigitado = (evento: React.ChangeEvent<HTMLInputElement>) => {
    aoAlterado(evento.target.value);
  };

  return (
    <div className={style.campotexto}>
      <label>{label}</label>
      <div>
        <input value={valor} onChange={aoDigitado} required={obrigatorio} placeholder={placeholder} />
        {icone === 'busca' &&
          <FaLocationDot style={{color: '#686665'}} />
        }
      </div>
    </div>
  );
}

export default CampoTexto;