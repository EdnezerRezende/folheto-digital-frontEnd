export class OfertaServicoNewDTO {
  id: number;
  nome: string;
  idIgreja: number;
  descricao: string = "";
  telefones: string[] = new Array<string>();
  emailServico: string;
  instagram: string;
  facebook: string;
  endereco: string;
  dataCriacao: string;
}
