import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components childrens
import {listaContactoComponent} from './lista-contacto.component';
import {nuevoEditarContactoComponent} from './nuevoeditar-contacto.component';
import  {listaTituloComponent} from './titulo/lista-titulo.component';
import {NuevoEditarTituloComponent} from './titulo/nuevoeditar-titulo.component';

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
      },
      {
        path: 'titulo/listaTitulo',
        component: listaTituloComponent,
        data: {
          title: 'Titulos'
        }
      },
      {
        path:'titulo/agregarTitulo',
        component: NuevoEditarTituloComponent,
        data:{
          title:'Titulos / Agregar'
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