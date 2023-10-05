import { Dayjs } from "dayjs";

export interface InputDataProps {
  obrigatorio: boolean;
  label: string;
  placeholder: string;
  valorData: Dayjs | null;
  aoAlteradoData: (valor: Dayjs|null) => void;
}
