// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views daugthers 
import { NuevoEditarUsuarioComponent } from './nuevoeditar-usuario.component';
import { ListaUsuarioComponent } from './lista-usuario.component';
// Theme Routing
import { UsuarioRoutingModule } from './usuario-routing.module'
import{ FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule    
  ],
  declarations: [
    ListaUsuarioComponent,
    NuevoEditarUsuarioComponent
  ]
})
export class UsuarioModule { }