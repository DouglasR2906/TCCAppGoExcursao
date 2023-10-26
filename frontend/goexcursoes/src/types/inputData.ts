import { Dayjs } from "dayjs";
import React from "react";

export interface InputDataProps {
  obrigatorio: boolean;
  label: string;
  valor: Dayjs | null;
  setData: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}
