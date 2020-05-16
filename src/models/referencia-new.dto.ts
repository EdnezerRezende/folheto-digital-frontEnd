import { CapituloDTO } from "./capitulo.dto";
import { VersiculoDTO } from "./versiculo.dto";
import { LivroNewDTO } from "./livroNew.dto";

export class ReferenciaNewDTO {
  id: number;
  book: LivroNewDTO = new LivroNewDTO();
  chapter: CapituloDTO = new CapituloDTO();
  verses: VersiculoDTO[] = new Array<VersiculoDTO>();
}
