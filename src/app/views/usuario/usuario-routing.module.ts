import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components childrens
import { ListaUsuarioComponent } from './lista-usuario.component';
import { NuevoEditarUsuarioComponent } from './nuevoeditar-usuario.component';

const routes: Routes = [
  
  {
    
    path: '',
    data: {
      title: 'Usuarios'
    },
    children: [
      {
        path: '',
        redirectTo: 'usuario'
      },
      {
        path: 'usuario',
        component: ListaUsuarioComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'agregarNuevo',
        component: NuevoEditarUsuarioComponent,
        data: {
          title: 'Empleado / Agregar'
        }
      },
      {
        path: 'agregarNuevo/:id',
        component: NuevoEditarUsuarioComponent,
        data: {
          title: 'Empleados / Editar'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {}