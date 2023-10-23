import { Dayjs } from "dayjs";

export interface Excursao {
  id: string;
  titulo: string;
  origem: string;
  destino: string;
  dataIda: string;
  horaIda: string;
  dataVolta: string;
  horaVolta: string;
  categoria: string;
  imgUrl: string | "";
  localEmbarque: string;
  valorTotal: number;
  selecionado: boolean;
}
