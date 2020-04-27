import { CidadeDTO } from "./cidade.dto";

export class EnderecoDTO {
  id: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: CidadeDTO = new CidadeDTO();
}
