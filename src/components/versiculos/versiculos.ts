import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  Renderer,
} from "@angular/core";
import { VersiculoDTO } from "../../models/versiculo.dto";

@Component({
  selector: "versiculos",
  templateUrl: "versiculos.html",
})
export class VersiculosComponent implements OnInit {
  @Input("versiculos")
  versiculos: VersiculoDTO[] = new Array<VersiculoDTO>();

  @Input("isDeleta")
  isDeleta: boolean = false;

  @Output()
  sendDeleteEnvio = new EventEmitter<any>();

  isHabilita: boolean = false;

  accordionExpanded = false;

  @ViewChild("cc")
  cardContent: any;

  fonteMaior = 4;
  fonteMenor = 4;
  @Input("tamanhoFonte")
  tamanhoFonte = 20;

  constructor(public renderer: Renderer) {}

  ngOnInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setElementStyle(
      this.cardContent.nativeElement,
      "webkitTransition",
      "max-height 500ms, padding 500ms"
    );
  }

  fonteDiminuir() {
    this.tamanhoFonte -= this.fonteMenor;
  }
  fonteAumentar() {
    this.tamanhoFonte += this.fonteMaior;
  }

  sendDelete(ver: VersiculoDTO) {
    this.sendDeleteEnvio.emit(ver);
  }

  mostraVersiculos() {
    this.isHabilita = !this.isHabilita;
  }

  toggleAccordion() {
    if (this.accordionExpanded) {
      this.renderer.setElementStyle(
        this.cardContent.nativeElement,
        "max-height",
        "0px"
      );
      this.renderer.setElementStyle(
        this.cardContent.nativeElement,
        "padding",
        "0px 16px"
      );
    } else {
      this.renderer.setElementStyle(
        this.cardContent.nativeElement,
        "max-height",
        "10000px"
      );
      this.renderer.setElementStyle(
        this.cardContent.nativeElement,
        "padding",
        "13px 16px"
      );
    }
    this.accordionExpanded = !this.accordionExpanded;
  }
}
