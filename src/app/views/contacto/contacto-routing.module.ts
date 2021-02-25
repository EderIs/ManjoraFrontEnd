import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProGuardService as guard} from '../../guards/pro-guard.service';

// import components childrens
import {listaContactoComponent} from './lista-contacto.component';
import {nuevoEditarContactoComponent} from './nuevoeditar-contacto.component';
import  {listaTituloComponent} from './titulo/lista-titulo.component';
import {NuevoEditarTituloComponent} from './titulo/nuevoeditar-titulo.component';
import {listaBancoComponent} from './banco/lista-banco.component';
import {NuevoEditarBancoComponent} from './banco/nuevoeditar-banco.component';
import {listaCuentasBComponent} from './cuentasB/lista-cuentaB.component';
import {NuevoEditarCuentaBComponent} from './cuentasB/nuevoeditar-cuentaB.component';
import {ListaEstadoComponent} from './estado/lista-estado.component';
import {NuevoEditarEstadoComponent} from './estado/nuevoeditar-estado.component';
import {ListaPaisComponent} from './pais/lista-pais.component';
import {NuevoEditarPaisComponent} from './pais/nuevoeditar-pais.component';

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
        path: 'agregarNuevo/:id',
        component: nuevoEditarContactoComponent,
        data: {
          title: 'Editar'
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
        path:'new',
        component: NuevoEditarTituloComponent,
        data:{
          title:'Titulos / Agregar'
        }
      },
      {
        path:':id',
        component: NuevoEditarTituloComponent,
        data:{
          title:'Titulos / Editar'
        }
      },
      {
        path:'banco/listarBanco',
        component: listaBancoComponent,
        data:{
          title:'Bancos'
        }
      },
      {
        path:'banco/agregarBanco',
        component: NuevoEditarBancoComponent,
        data:{
          title:'Bancos / Agregar'
        }
      },
      {
        path:'banco/editarBanco/:id',
        component:NuevoEditarBancoComponent,
        data:{
          title:'Bancos / Agregar'
        }
      },
      {
        path:'cuentasB/listarCuentaB',
        component: listaCuentasBComponent,
        data:{
          title:'Cuentas Bancarias'
        }
      },
      {
        path:'cuentasB/agregarCuentaB',
        component: NuevoEditarCuentaBComponent,
        data:{
          title:'Cuentas / Agregar'
        }
      },
      {
        path:'estado/listarEstado',
        component: ListaEstadoComponent,
        data:{
          title:'Estados'
        }
      },
      {
        path:'estado/agregarNuevo',
        component: NuevoEditarEstadoComponent,
        data:{
          title:'Estado / Agregar'
        }
      },
      {
        path:'estado/editarNuevo/:id',
        component: NuevoEditarEstadoComponent,
        data:{
          title:'Estado / Editar'
        }
      },
      {
        path:'pais/listarPais',
        component: ListaPaisComponent,
        data:{
          title:'Paises'
        }
      },
      {
        path:'pais/agregarNuevo',
        component: NuevoEditarPaisComponent,
        data:{
          title:'Pais / Agregar'
        }
      },{
        path:'pais/editarNuevo/:id',
        component: NuevoEditarPaisComponent,
        data:{
          title:'Pais / Editar'
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