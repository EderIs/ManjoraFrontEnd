import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import components
import  {CalendarioCrear} from  './calendario-crear.component';

const routes: Routes = [
  
    {
      path: '',
      data: {
        title: 'Calendario'
      },
      children: [
        {
          path: '',
          redirectTo: 'calendario'
        },
        {
          path: 'calendario',
          component: CalendarioCrear,
          data: {
            title: 'Crear Calendarios'
          }
        } 
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CalendarioRoutingModule {}