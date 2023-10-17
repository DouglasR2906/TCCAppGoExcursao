import style from './CampoData.module.scss';
import { InputDataProps } from '../../types/inputData';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

function CampoData({ label, valorData, aoAlteradoData }: InputDataProps) {

  const aoDigitado = (data: Dayjs) => {
    aoAlteradoData(data);
  };

  return (
    <div className={style.campodata}>
      <label>{label}</label>
      <DatePicker value={valorData} onChange={() => aoDigitado(valorData)} />
    </div>
  );
}

export default CampoData;