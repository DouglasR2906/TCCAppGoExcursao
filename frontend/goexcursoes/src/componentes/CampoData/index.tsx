import style from './CampoData.module.scss'
import { InputProps } from '../../types/input';
import InputMask from 'react-input-mask';
import InputMaskProps from 'react-input-mask/types';

function CampoData({ obrigatorio, label, valor, placeholder, aoAlterado }: InputProps) {

  const aoDigitado = (evento: React.ChangeEvent<HTMLInputElement>) => {
    aoAlterado(evento.target.value);
  }

  const inputMaskProps: InputMaskProps = {
    value,
    onChange,
    required,
    placeholder,
    mask,
    validate,
  };

  return (
    <div className={style.campodata}>
      <label>{label}</label>
      <InputMask value={valor} onChange={aoDigitado} required={obrigatorio} placeholder={placeholder} mask="00/00/0000" validate={(value) => DateMask.isValid(value)}/>
    </div>
  );
};

export default CampoData;