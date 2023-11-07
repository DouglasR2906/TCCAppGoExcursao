import { Paginacao } from "./paginacao";

export interface IExcursao {
  idExcursao: number;
  idUsuarioExcursao: number;
  tituloExcursao: string;
  cidadeOrigemExcursao: string;
  cidadeDestinoExcursao: string;
  descricaoExcursao: string;
  valorExcursao: number;
  dataIdaExcursao: string;
  dataVoltaExcursao: string;
  horaIdaExcursao: string;
  horaVoltaExcursao: string;
  categoriaExcursao: number | string;
  canceladaExcursao: boolean;
  urlImagensExcursao: string;
  localEmbarqueExcursao: string;
}

export interface IExcursaoPage extends Paginacao {
  content: IExcursao[];
}

export interface IExcursaoSelecionada extends IExcursao {
  selecionada: boolean;
}
