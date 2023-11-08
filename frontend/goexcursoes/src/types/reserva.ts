import { IViajante } from "./viajantes";

export interface IReserva {
  idReserva?: number;
  idUsuarioReserva: number;
  idExcursaoReserva: number;
  qtdViajantesReserva: number;
  valorTotalReserva: number;
  idFormaPagtoReserva: number;
  viajantes: IViajante[];
}

export interface IReservaListagem {
  idReserva: number;
  tituloExcursaoReserva: string;
  destinoExcursaoReserva: string;
  qtdViajantesReserva: number;
  valorTotalReserva: number;
  formaPagtoReserva: string;
  statusReserva: number;
}

export const statusReserva = ["Solicitado", "Recusado", "Confirmado"];
