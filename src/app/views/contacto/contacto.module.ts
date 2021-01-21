// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views hijas 
import {listaContactoComponent} from './lista-contacto.component'
import {nuevoEditarContactoComponent} from './nuevoeditar-contacto.component'

// Theme Routing
import {ContactoRoutingModule} from './contacto-routing.module'

@NgModule({
  imports: [
    CommonModule,
    ContactoRoutingModule    
  ],
  declarations: [
    listaContactoComponent,
    nuevoEditarContactoComponent,
  ]
})
export class ContactoModule { }