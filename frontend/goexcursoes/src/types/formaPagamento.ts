export interface FormaPagamento {
  idFormaPagamento: number;
  descricaoFormaPagamento: string;
}

export interface FormaPagamentoExcursao {
  idExcursao: number;
  idFormaPagto: number;
  descricaoFormaPagamento: string;
}
