// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views daugthers 
import {ListaProyectoComponent} from './lista-proyecto.component';
import {ListaEtapaComponent} from './etapa/lista-etapa.component';
import {ListaTareaComponent} from './tarea/lista-tarea.component';

// Theme Routing
import {ProyectoRoutingModule} from './proyecto-routing.module'
import{ FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    FormsModule,
    DragDropModule,
    ModalModule.forRoot()   
  ],
  declarations: [
    ListaProyectoComponent,
    ListaEtapaComponent,
    ListaTareaComponent
  ]
})
export class ProyectoModule { }