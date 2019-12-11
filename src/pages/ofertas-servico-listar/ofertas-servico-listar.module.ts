import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfertasServicoListarPage } from './ofertas-servico-listar';

@NgModule({
  declarations: [
    OfertasServicoListarPage,
  ],
  imports: [
    IonicPageModule.forChild(OfertasServicoListarPage),
  ],
})
export class OfertasServicoListarPageModule {}
