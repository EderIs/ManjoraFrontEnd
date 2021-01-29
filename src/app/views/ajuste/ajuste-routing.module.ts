import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

//Import ChidlComponents
import {ListaAjusteComponent} from './lista-ajustes.component';



const routes : Routes=[
{
    path: '',
    data: {
      title: 'Ajuste'
    },
    children: [
      {
        path: '',
        redirectTo: 'ajuste'
      },
      {
          path:'ajuste',
          component: ListaAjusteComponent,
          data:{
            title:'ajuste'           
          }
      }    
    ]
}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AjusteRoutingModule {}