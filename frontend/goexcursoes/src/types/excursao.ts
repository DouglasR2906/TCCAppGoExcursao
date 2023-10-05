import { Dayjs } from "dayjs";

export interface Excursao {
    destino: string;
    dataIda: Dayjs | null;
    dataVolta: Dayjs | null;
    categoria: string;
    imgUrl: string | ''
}