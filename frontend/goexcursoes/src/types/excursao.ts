import { ICategoria } from "./categoria";

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
  categoriaExcursao: ICategoria;
  canceladaExcursao: boolean;
  urlImagensExcursao: string;
  localEmbarqueExcursao: string;
}

export interface IExcursaoSelecionada extends IExcursao {
  selecionada: boolean;
}
