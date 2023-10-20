import { useState, useEffect } from "react";
import style from "./CampoData.module.scss";
import { InputDataProps } from "../../types/inputData";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

function CampoData({ label, valorData, aoAlteradoData }: InputDataProps) {
  const [data, setData] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (data) {
      valorData = data.format("DD/MM/YYYY");
      aoDigitado(data.format("DD/MM/YYYY"));
    }
  }, [data]);

  function aoDigitado(data: string) {
    aoAlteradoData(data);
  }

  return (
    <div className={style.campodata}>
      <label>{label}</label>
      <DatePicker value={data} onChange={(valor) => setData(valor)} />
    </div>
  );
}

export default CampoData;