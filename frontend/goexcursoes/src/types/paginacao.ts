import { Excursao } from "./excursao";

export interface Paginacao extends Excursao {
  content: [
    {
      idExcursao: 2;
      idUsuarioExcursao: 1;
      tituloExcursao: "Excursao Festival da Linguiça";
      cidadeOrigemExcursao: "Arcos MG";
      cidadeDestinoExcursao: "Formiga MG";
      descricaoExcursao: "Incluso Onibus, café da manhã, guia, visita ao centro histórico, Aeroporto Confins, e Mineirão";
      valorExcursao: 80;
      dataIdaExcursao: "2023-11-25";
      dataVoltaExcursao: "2023-11-26";
      horaIdaExcursao: "08:00:00";
      horaVoltaExcursao: "12:00:00";
      idCategoriaExcursao: 3;
      canceladaExcursao: false;
      localEmbarqueExcursao: "Rodoviaria";
      urlImagensExcursao: "http://localhost/GoExcursoes/Imagens/formiga.jpg";
    }
  ];
  pageable: {
    sort: {
      empty: false;
      sorted: true;
      unsorted: false;
    };
    offset: 0;
    pageSize: 1;
    pageNumber: 0;
    unpaged: false;
    paged: true;
  };
  totalElements: 1;
  totalPages: 1;
  last: true;
  size: 1;
  number: 0;
  sort: {
    empty: false;
    sorted: true;
    unsorted: false;
  };
  numberOfElements: 1;
  first: true;
  empty: false;
}
