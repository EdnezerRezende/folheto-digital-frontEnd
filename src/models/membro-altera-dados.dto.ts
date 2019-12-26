import { EnderecoDTO } from "./endereco.dto";

export class MembroAlteraDadosDTO {
  id: number;
  email: string;
  telefones: string[];
  enderecos: EnderecoDTO[] = new Array<EnderecoDTO>();
  imageUrl?: any;
}
