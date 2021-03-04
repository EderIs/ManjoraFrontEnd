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
        path: 'usuario/listaUsuario',
        component: ListaUsuarioComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'agregarNuevo',
        component: NuevoEditarUsuarioComponent,
        data: {
          title: 'Usuario / Agregar'
        }
      },
      {
        path: 'agregarNuevo/:id/:perfil',
        component: NuevoEditarUsuarioComponent,
        data: {
          title: 'Usuario / Editar'
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