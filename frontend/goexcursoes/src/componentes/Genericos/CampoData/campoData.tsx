import { DatePicker } from "@mui/x-date-pickers";
import { InputDataProps } from "../../../types/inputData";
import style from "./CampoData.module.scss";

function CampoData({ label, valor, setData }: InputDataProps) {

  return (
    <div className={style.campodata}>
      <label>{label}</label>
      <DatePicker value={valor} onChange={(valor) => setData(valor)} />
    </div>
  );
}

export default CampoData;