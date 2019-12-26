import { EstadoDTO } from "./estado.dto";

export class CidadeDTO {
    id: string;
    nome: string;
    estado: EstadoDTO;
}