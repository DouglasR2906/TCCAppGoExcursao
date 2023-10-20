import { Dayjs } from "dayjs";

export interface Excursao {
  id: string;
  titulo: string;
  origem: string;
  destino: string;
  dataIda: string;
  dataVolta: string;
  categoria: string;
  imgUrl: string | "";
  valorTotal: number;
  selecionado: boolean;
}
