import { AbreviacaoDTO } from "./abreviacao.dto";

export class LivroNewDTO {
  abbrev: AbreviacaoDTO = new AbreviacaoDTO();
  author: string;
  chapters: number;
  groupe: string;
  nameU: string;
  versionN: string;
  testament: string;
}
