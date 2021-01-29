// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views daugthers 
import { ListaEmpleadoComponent } from './lista-empleado.component';
import { NuevoEditarEmpleadoComponent } from './nuevoeditar-empleado.component';
import { ListaDepartamentoComponent } from './departamento/lista-departamento.component';
import { NuevoEditarDepartamentoComponent } from './departamento/nuevoeditar-departamento.component';
import { ListaPuestoComponent } from './puesto/lista-puesto.component';
import { NuevoEditarPuestoComponent } from './puesto/nuevoeditar-puesto.component';
import { ListaHorasLComponent } from './horasL/lista-horasL.component';
import { NuevoEditarHorasLComponent } from './horasL/nuevoeditar-horasL.component';
import { ListaHorarioTrabajoComponent } from './horarioT/lista-horarioTrabajo.component';
import { NuevoEditarHorarioTrabajoComponent } from './horarioT/nuevoeditar-horarioTrabajo.component';

// Theme Routing
import {EmpleadoRoutingModule} from './empleado-routing.module'
import{ FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    FormsModule    
  ],
  declarations: [
    ListaEmpleadoComponent,
    NuevoEditarEmpleadoComponent,
    ListaDepartamentoComponent,
    NuevoEditarDepartamentoComponent,
    ListaPuestoComponent,
    NuevoEditarPuestoComponent,
    ListaHorasLComponent,
    NuevoEditarHorasLComponent,
    ListaHorarioTrabajoComponent,
    NuevoEditarHorarioTrabajoComponent
  ]
})
export class EmpleadoModule { }