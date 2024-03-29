import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProGuardService as guard} from './guards/pro-guard.service';



// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register/:id',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [guard],
    data: {
      expectedRol: ['admin','user'],
      title: 'Inicio'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'contacto',
        loadChildren: () => import('./views/contacto/contacto.module').then(m => m.ContactoModule)
      },

      {
        path: 'empleado',
        loadChildren: () => import('./views/empleado/empleado.module').then(m => m.EmpleadoModule)
      },

      {
        path: 'usuario',
        loadChildren: () => import('./views/usuario/usuario.module').then(m => m.UsuarioModule)
      },
      
      {
        path:'ajuste',
        loadChildren:() => import('./views/ajuste/ajuste.module').then(m => m.AjusteModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path:'calendario',
        loadChildren: () => import('./views/calendario/calendario.module').then(c => c.CalendarioModule)
      },
      {
        path:'proyecto',
        loadChildren: () => import('./views/proyecto/proyecto.module').then(p => p.ProyectoModule)
      },
      {
        path:'categoria',
        loadChildren: () => import('./views/categoria/categoria.module').then(p => p.CategoriaModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
