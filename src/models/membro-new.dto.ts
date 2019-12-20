import { EnderecoDTO } from "./endereco.dto";

export class MembroNewDTO {
    id:number;
    nome: string;
    dataNascimento: string;
    email: string;
    telefones: string;
    senha: string;
    logradouro:string;
    cidadeId:number;
    bairro:string;
    complemento:string;
    cep:string;
    numero:string;
    cpf: string;
    dataCadastro:Date;
    bloqueado: boolean;
    idIgreja:number;
    perfis:any[] = new Array<any>();
}