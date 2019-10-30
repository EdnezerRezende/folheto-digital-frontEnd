import { EnderecoDTO } from "./endereco.dto";

export class PgDTO {
    id: number;
    lider: string;
    endereco: EnderecoDTO = new EnderecoDTO();
    responsavelCasa:string;
    diaSemanaAtividade:string;
    horaAtividade:string;
    idIgreja:number;
}