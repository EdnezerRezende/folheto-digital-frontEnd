import { AbreviacaoDTO } from "./abreviacao.dto";

export class LivroDTO {
  abbrev: AbreviacaoDTO;
  author: string;
  chapters: number;
  group: string;
  name: string;
  testament: string;
  version: string;
}
