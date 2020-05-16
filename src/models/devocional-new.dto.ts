import { ReferenciaNewDTO } from "./referencia-new.dto";

export class DevocionalNewDTO {
  id: number;
  referencia: ReferenciaNewDTO;
  textoReferencia: string;
  idIgreja: number;
  descricao: string;
  dataCriacao: string;
  isLido: boolean;
}
