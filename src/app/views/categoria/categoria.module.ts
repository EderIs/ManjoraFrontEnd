// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views daugthers 
import {ListaCategoriaComponent} from './lista-categoria.component';
import {ListaNotaComponent} from './nota/lista-nota.component';

// Theme Routing
import {CategoriaRoutingModule} from './categoria-routing.module'
import{ FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    DragDropModule,
    ModalModule.forRoot()   
  ],
  declarations: [
    ListaCategoriaComponent,
    ListaNotaComponent
  ]
})
export class CategoriaModule { }