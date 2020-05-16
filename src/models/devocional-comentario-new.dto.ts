import { ReferenciaDTO } from "./referencia.dto";
import { ReferenciaNewDTO } from "./referencia-new.dto";

export class DevocionalComentarioNewDTO {
  id: number;
  idMembro: number;
  referencia: number;
  chamouAtencao: string = "";
  sobreDeus: string = "";
  sobreHumanidade: string = "";
  oQueAprendi: string = "";
}
