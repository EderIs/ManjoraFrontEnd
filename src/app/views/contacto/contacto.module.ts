// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views daugthers 
import {listaContactoComponent} from './lista-contacto.component'
import {nuevoEditarContactoComponent} from './nuevoeditar-contacto.component'
import {listaTituloComponent} from './titulo/lista-titulo.component'
import {NuevoEditarTituloComponent } from './titulo/nuevoeditar-titulo.component'


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
    listaTituloComponent,
    NuevoEditarTituloComponent,
  ]
})
export class ContactoModule { }