import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components childrens
import  {ListaCategoriaComponent} from './lista-categoria.component';
import {ListaNotaComponent} from  './nota/lista-nota.component';

const routes: Routes = [
  
  {
    
    path: '',
    data: {
      title: 'categoria'
    },
    children: [
      {
        path: '',
        redirectTo: 'categoria'
      },
      {
        path: 'categoria',
        component: ListaCategoriaComponent,
        data: {
          title: 'Categorias'
        }
      },
      {
        path:'nota/:id',
        component:ListaNotaComponent,
        data:{
          title:'Nota',          
        }
      }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule {}