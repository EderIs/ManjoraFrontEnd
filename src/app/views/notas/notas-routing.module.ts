import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components childrens
import  {ListaNotasComponent} from './lista-notas.component';
import {ListaCategoriaComponent} from  './categoria/lista-categoria.component';
import {ListaNotaComponent} from './nota/lista-nota.component';

const routes: Routes = [
  
  {
    
    path: '',
    data: {
      title: 'Notas'
    },
    children: [
      {
        path: '',
        redirectTo: 'Notas'
      },
      {
        path: 'notas',
        component: ListaNotasComponent,
        data: {
          title: 'Notas'
        }
      },
      {
        path:'categoria/:id',
        component: ListaCategoriaComponent,
        data:{
          title:'Categoria'
        }
      },
      {
        path:'nota/:id',
        component:ListaNotaComponent,
        data:{
          title:'Nota'
        }
      }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasRoutingModule {}