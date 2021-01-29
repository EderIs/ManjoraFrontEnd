// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


//Import Child Components
import {ListaUsuarioComponent} from './usuario/lista-usuario.component';




// Theme Routing
import {UsuarioRoutingModule} from './usuario-routing.module'
import{ FormsModule} from '@angular/forms';
@NgModule({
    imports: [
      CommonModule,
      UsuarioRoutingModule,
      FormsModule    
    ],
    declarations: [
      ListaUsuarioComponent
    ]
  })
  export class ContactoModule { }