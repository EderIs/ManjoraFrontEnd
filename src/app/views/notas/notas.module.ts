// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views daugthers 
import {ListaNotasComponent} from './lista-notas.component';
import {ListaCategoriaComponent} from './categoria/lista-categoria.component';
import {ListaNotaComponent} from './nota/lista-nota.component';

// Theme Routing
import {NotasRoutingModule} from './notas-routing.module'
import{ FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    NotasRoutingModule,
    FormsModule,
    DragDropModule,
    ModalModule.forRoot()   
  ],
  declarations: [
    ListaNotasComponent,
    ListaCategoriaComponent,
    ListaNotaComponent
  ]
})
export class NotasModule { }