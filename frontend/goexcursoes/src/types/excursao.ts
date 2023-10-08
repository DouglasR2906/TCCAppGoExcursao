import { Dayjs } from "dayjs";

export interface Excursao {
    id: string;
    destino: string;
    dataIda: Dayjs | null;
    dataVolta: Dayjs | null;
    categoria: string;
    imgUrl: string | '';  
    selecionado: boolean
}