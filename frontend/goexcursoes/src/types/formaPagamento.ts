export interface IFormaPagamento {
  idFormaPagamento: number;
  descricaoFormaPagamento: string;
}

export interface IFormaPagamentoExcursao {
  idExcursao: number;
  idFormaPagto: number;
  descricaoFormaPagamento: string;
}
