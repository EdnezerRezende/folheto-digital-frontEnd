import { ReferenciaDTO } from "./referencia.dto";
import { ReferenciaNewDTO } from "./referencia-new.dto";

export class ComentarioDTO {
  id: number;
  dataCriacao: string;
  referencia: number;
  chamouAtencao: string;
  sobreDeus: string;
  sobreHumanidade: string;
  oQueAprendi: string;
}
