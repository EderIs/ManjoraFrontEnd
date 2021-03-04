import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components childrens
import  {ListaProyectoComponent} from './lista-proyecto.component';
import {ListaEtapaComponent} from  './etapa/lista-etapa.component';
import {ListaTareaComponent} from './tarea/lista-tarea.component';

const routes: Routes = [
  
  {
    
    path: '',
    data: {
      title: 'Proyecto'
    },
    children: [
      {
        path: '',
        redirectTo: 'Proyecto'
      },
      {
        path: 'proyecto',
        component: ListaProyectoComponent,
        data: {
          title: 'Proyectos'
        }
      },
      {
        path:'etapa/:id',
        component: ListaEtapaComponent,
        data:{
          title:'Etapa'
        }
      },
      {
        path:'tarea/:id',
        component:ListaTareaComponent,
        data:{
          title:'Tarea'
        }
      }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule {}