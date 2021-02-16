import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components childrens
import { ListaEmpleadoComponent } from './lista-empleado.component';
import { ListaPuestoComponent } from './puesto/lista-puesto.component';
import { NuevoEditarEmpleadoComponent } from './nuevoeditar-empleado.component';
import { ListaDepartamentoComponent } from './departamento/lista-departamento.component';
import { NuevoEditarPuestoComponent } from './puesto/nuevoeditar-puesto.component';
import { NuevoEditarDepartamentoComponent } from './departamento/nuevoeditar-departamento.component';
import { ListaHorarioTrabajoComponent } from './horarioT/lista-horarioTrabajo.component';
import { ListaHorasLComponent } from './horasL/lista-horasL.component';
import { NuevoEditarHorasLComponent } from './horasL/nuevoeditar-horasL.component';
import { NuevoEditarHorarioTrabajoComponent } from './horarioT/nuevoeditar-horarioTrabajo.component';

const routes: Routes = [
  
  {
    
    path: '',
    data: {
      title: 'Empleados'
    },
    children: [
      {
        path: '',
        redirectTo: 'empleado'
      },
      {
        path: 'empleado',
        component: ListaEmpleadoComponent,
        data: {
          title: 'Empleados'
        }
      },
      {
        path: 'agregarNuevo',
        component: NuevoEditarEmpleadoComponent,
        data: {
          title: 'Empleado / Agregar'
        }
      },
      {
        path: 'agregarNuevo/:id',
        component: NuevoEditarEmpleadoComponent,
        data: {
          title: 'Empleados / Editar'
        }
      },
      {
        path: 'puesto/listarPuesto',
        component: ListaPuestoComponent,
        data: {
          title: 'Puestos'
        }
      },
      {
        path: 'new',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Puestos / Agregar'
        }
      },
      {
        path: ':id',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Puestos / Editar'
        }
      },
      {
        path: 'departamento/listarDepartamento',
        component: ListaDepartamentoComponent,
        data: {
          title: 'Departamentos'
        }
      },
      {
        path: 'departamento/agregarDepartamento',
        component: NuevoEditarDepartamentoComponent,
        data: {
          title: 'Departamentos / Agregar'
        }
      },
      {
        path: 'departamento/agregarDepartamento/:id',
        component: NuevoEditarDepartamentoComponent,
        data: {
          title: 'Departamentos / Editar'
        }
      },
      {
        path: 'horasL/listarHorasL',
        component: ListaHorasLComponent,
        data: {
          title: 'Horas Laborales'
        }
      },
      {
        path: 'horasL/agregarHorasL',
        component: NuevoEditarHorasLComponent,
        data: {
          title: 'Horas Laborales / Agregar'
        }
      },
      {
        path: 'horasL/agregarHorasL/:id',
        component: NuevoEditarHorasLComponent,
        data: {
          title: 'Horas Laborales / Editar'
        }
      },
      {
        path: 'horarioT/listarHorarioT',
        component: ListaHorarioTrabajoComponent,
        data: {
          title: 'Horario de Trabajo'
        }
      },
      {
        path: 'horarioT/agregarHorarioT',
        component: NuevoEditarHorarioTrabajoComponent,
        data: {
          title: 'Horario / Agregar'
        }
      },
      {
        path: 'horarioT/agregarHorarioT/:id',
        component: NuevoEditarHorarioTrabajoComponent,
        data: {
          title: 'Horario / Editar'
        }
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule {}