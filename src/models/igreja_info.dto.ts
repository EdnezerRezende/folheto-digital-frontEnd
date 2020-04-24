import { EnderecoDTO } from "./endereco.dto";

export class IgrejaInfoDTO {
    id:number;
    nome: string;
    cnpj: string;
    email: string;
    endereco:EnderecoDTO;
    telefones: string[];
}