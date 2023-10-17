import { Dayjs } from 'dayjs';

export interface InputDataProps {
  obrigatorio: boolean;
  label: string;
  placeholder: string;
  valorData: Dayjs;
  aoAlteradoData: (valor: Dayjs) => void;
}
