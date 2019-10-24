import { EnderecoDTO } from "./endereco.dto";

export interface PgDTO {
    id: string;
    lider: string;
    endereco: EnderecoDTO;
    responsavelCasa:string;
}