import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {listaContactoComponent} from './lista-contacto.component'
import {nuevoEditarContactoComponent} from './nuevoeditar-contacto.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Contacto'
    },
    children: [
      {
        path: '',
        redirectTo: 'contacto'
      },
      {
        path: 'contacto',
        component: listaContactoComponent,
        data: {
          title: 'contacto'
        }
      },
      {
        path: 'agregarNuevo',
        component: nuevoEditarContactoComponent,
        data: {
          title: 'Nuevo'
        }

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactoRoutingModule {}