import { Dayjs } from 'dayjs';

export interface Excursao {
    id: string;
    destino: string;
    dataIda: Dayjs; 
    dataVolta: Dayjs;
    categoria: string;
    imgUrl: string | '';  
    selecionado: boolean
}