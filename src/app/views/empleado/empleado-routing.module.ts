import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components childrens
import { ListaEmpleadoComponent } from './lista-empleado.component';
import { ListaPuestoComponent } from './puesto/lista-puesto.component';
import { NuevoEditarEmpleadoComponent } from './nuevoeditar-empleado.component';
import { ListaDepartamentoComponent } from './departamento/lista-departamento.component';
import { NuevoEditarPuestoComponent } from './puesto/nuevoeditar-puesto.component';
import { NuevoEditarDepartamentoComponent } from './departamento/nuevoeditar-departamento.component';

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
        path: 'puesto/agregarPuesto',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Puestos / Agregar'
        }
      },
      {
        path: 'puesto/agregarPuesto/:id',
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
        path: 'horasLaborales/listarHorasL',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Horas Laborales'
        }
      },
      {
        path: 'horasLaborales/agregarHorasL',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Puestos / Agregar'
        }
      },
      {
        path: 'horasLaborales/agregarHorasL/:id',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Puestos / Agregar'
        }
      },
      {
        path: 'horarioTrabajo/listarHorarioT',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Horas Laborales'
        }
      },
      {
        path: 'horarioTrabajo/agregarHorarioT',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Puestos / Agregar'
        }
      },
      {
        path: 'horarioT/agregarHorarioT/:id',
        component: NuevoEditarPuestoComponent,
        data: {
          title: 'Puestos / Agregar'
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