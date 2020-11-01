import { LivroDTO } from "./livro.dto";
import { CapituloDTO } from "./capitulo.dto";
import { VersiculoDTO } from "./versiculo.dto";

export class ReferenciaDTO {
  id: number;
  book: LivroDTO;
  chapter: CapituloDTO = new CapituloDTO();
  verses: VersiculoDTO[] = new Array<VersiculoDTO>();
}
