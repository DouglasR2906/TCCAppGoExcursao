import style from './CampoData.module.scss'
import { InputDataProps } from '../../types/inputData';
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

function CampoData({ obrigatorio, label, valorData, aoAlteradoData }: InputDataProps) {

  const aoDigitado = (data: Dayjs | null) => {
    console.log("Data:", data?.format('DD/MM/YYYY'))
    aoAlteradoData(data);
  }

  return (
    <div className={style.campodata}>
      <label>{label}</label>
      <DatePicker value={valorData} onChange={(valor) => aoDigitado(valor)} format="DD/MM/YYYY" />
    </div>
  );
};

export default CampoData;