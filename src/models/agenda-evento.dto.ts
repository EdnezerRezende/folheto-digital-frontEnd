import { EnderecoDTO } from "./endereco.dto";

export class AgendaEventoDTO {
    id: number;
    titulo: string;
    idIgreja:number;
    diaSemanaAtividade:string;
    horaAtividade:string;
    descricao:string;
    isEvento:boolean;
    dataInicio:string;
    dataFim:string;
}