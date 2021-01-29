// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


//Import Child Components
import {ListaAjusteComponent} from './lista-ajustes.component';




// Theme Routing
import {AjusteRoutingModule} from './ajuste-routing.module'
import{ FormsModule} from '@angular/forms';
@NgModule({
    imports: [
      CommonModule,
      AjusteRoutingModule,
      FormsModule    
    ],
    declarations: [
        ListaAjusteComponent
    ]
  })
  export class AjusteModule { }