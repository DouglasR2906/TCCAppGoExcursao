import { IViajante } from "./viajantes";

export interface IReserva {
  idReserva?: number;
  idUsuarioReserva: number;
  idExcursaoReserva: number;
  qtdViajantesReserva: number;
  valorTotalReserva: number;
  formaPagtoReserva: number;
  viajantes: IViajante[];
}

export interface IReservaListagem {
  idReserva: number;
  tituloExcursaoReserva: string;
  destinoExcursaoReserva: string;
  qtdViajantesReserva: number;
  valorTotalReserva: number;
  formaPagtoReserva: number;
  statusReserva: number;
}

export const statusReserva = ["Solicitado", "Recusado", "Confirmado"];
