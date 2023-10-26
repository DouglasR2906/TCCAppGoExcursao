export interface Excursao {
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
  idCategoriaExcursao: number;
  canceladaExcursao: boolean;
  urlImagensExcursao: string;
  localEmbarqueExcursao: string;
  selecionado: boolean | undefined;
}
