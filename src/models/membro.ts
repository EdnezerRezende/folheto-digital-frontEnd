import { EnderecoDTO } from "./endereco.dto";

export class Membro {
  id: number;
  nome: string;
  dataNascimento: string;
  email: string;
  telefones: string;
  senha: string;
  enderecos: EnderecoDTO[];
  cpf: string;
  dataCadastro: Date;
  bloqueado: boolean;
  perfis: any[] = new Array<any>();
  imageUrl?: any;
}
