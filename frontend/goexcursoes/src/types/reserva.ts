import { IViajante } from "./viajantes";

export interface IReserva {
  idReserva?: number;
  idExcursaoReserva: number;
  idClienteReserva: number;
  qtdViajantesReserva: number;
  valorTotalReserva: number;
  idFormaPagtoReserva: number;
  viajantes: IViajante[];
}

export interface IReservaListagem {
  idReserva: number;
  tituloExcursaoReserva: string;
  nomeClienteReserva: string;
  destinoExcursaoReserva: string;
  qtdViajantesReserva: number;
  valorTotalReserva: number;
  formaPagtoReserva: string;
  statusReserva: number;
}

export interface IReservaDetalhado {
  idReserva: number;
  idExcursaoReserva: number;
  idClienteReserva: number;
  destinoExcursaoReserva: string;
  qtdViajantesReserva: number;
  valorTotalReserva: number;
  formaPagtoReserva: string;
  statusReserva: number;
}

export interface IAtualizarStatus {
  idReserva: number;
  idExcursaoReserva: number;
  idClienteReserva: number;
  statusReserva: number;
}

export const statusReserva = ["Solicitado", "Recusado", "Confirmado"];
