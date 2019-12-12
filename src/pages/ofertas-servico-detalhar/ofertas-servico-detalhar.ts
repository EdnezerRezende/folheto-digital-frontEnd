import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OfertaServicoDTO } from '../../models/ofertaServico.dto';
import { BrMaskerIonicServices3, BrMaskModel } from 'brmasker-ionic-3';

@IonicPage()
@Component({
  selector: 'page-ofertas-servico-detalhar',
  templateUrl: 'ofertas-servico-detalhar.html',
})
export class OfertasServicoDetalharPage {
  servico:OfertaServicoDTO = new OfertaServicoDTO();

  constructor(public navCtrl: NavController, public navParams: NavParams, private brMasker: BrMaskerIonicServices3) {
    if (this.navParams.get('item')){
      this.servico = this.navParams.get('item');
      let telefones:string[] = new Array<string>();
      this.servico.telefones.forEach(telefone => {
        telefones.push(this.mascaraTelefone(telefone));
      });
      this.servico.telefones = telefones;
    }
  }

  private mascaraTelefone(tel:string):string {
    let config: BrMaskModel = new BrMaskModel();
    config.phone = true;
    return this.brMasker.writeCreateValue(tel, config);
  }

  ionViewDidLoad() {
  }

  
}
