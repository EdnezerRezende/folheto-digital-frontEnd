import { EnderecoDTO } from "./endereco.dto";
import { Membro } from "./membro";

export class IgrejaDTO {
  id: number;
  nome: string;
  endereco: EnderecoDTO;
  membros: Membro[];
}
