// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views daugthers 
import {listaContactoComponent} from './lista-contacto.component'
import {nuevoEditarContactoComponent} from './nuevoeditar-contacto.component'
import {listaTituloComponent} from './titulo/lista-titulo.component'
import {NuevoEditarTituloComponent } from './titulo/nuevoeditar-titulo.component'
import {listaBancoComponent} from './banco/lista-banco.component';
import {NuevoEditarBancoComponent} from './banco/nuevoeditar-banco.component';
import {listaCuentasBComponent} from './cuentasB/lista-cuentaB.component';
import {NuevoEditarCuentaBComponent} from './cuentasB/nuevoeditar-cuentaB.component';
import {ListaEstadoComponent} from './estado/lista-estado.component';
import {NuevoEditarEstadoComponent} from './estado/nuevoeditar-estado.component';
import {ListaPaisComponent} from './pais/lista-pais.component';
import {NuevoEditarPaisComponent} from './pais/nuevoeditar-pais.component';

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
    listaBancoComponent,
   NuevoEditarBancoComponent,
   listaCuentasBComponent,
   NuevoEditarCuentaBComponent,
   ListaEstadoComponent,
   NuevoEditarEstadoComponent,
   ListaPaisComponent,
   NuevoEditarPaisComponent,
  ]
})
export class ContactoModule { }