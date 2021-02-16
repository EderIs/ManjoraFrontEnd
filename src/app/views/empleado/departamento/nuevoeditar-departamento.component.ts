import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Departamento } from '../../../models/departamento';
import { Empleado } from '../../../models/empleado';

import { DepartamentoService } from '../../../service/departamento.service';
import { EmpleadoService } from '../../../service/empleado.service';
import { EstadoService } from '../../../service/estado.service';
import  {PaisService} from '../../../service/pais.service'


@Component({
  templateUrl: 'nuevoeditar-departamento.component.html'
})

export class NuevoEditarDepartamentoComponent implements OnInit{

  empleados: Empleado[] = [];
  departamento: Departamento;
  empleado : string [] =[];
  empleado1 : number = 0; 
  id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private empleadoService: EmpleadoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService
    ) { }
  
  ngOnInit(): void {
    this.cargarEmpleados();
    if (this.id != null){
      this.departamentoService.detail(this.id).subscribe(
        data => {
          this.departamento = data;
          this.empleado1 = data.empleado.id;
        },
        err => {
          console.log(err);
         
        }
      );
      this.departamento = new Departamento(this.empleado);
    }
    else{
      this.departamento = new Departamento(this.empleado);
    }
  }

  cargarEmpleados(): void {
    this.empleadoService.lista().subscribe(
      data => {
        this.empleados = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  cargarDepartamentos(): void {
    this.departamentoService.lista().subscribe();
  }

  onCreate(): void {
   // this.empleado.push(this.empleado1.toString()," ");
    if(this.id!=null){
     // this.departamento.empleado.id = this.empleado1;
      this.departamentoService.update(this.id, this.departamento).subscribe(
        data => {
          this.departamento = data;
        },
          err => {
            console.log(err);
            });
    }
    else{
   // this.departamento.setEmpleado(new Empleado(this.empleado));
    this.departamentoService.save(this.departamento).subscribe(
      response => {
       alert('Se inserto correctamente');
       this.router.navigate(['/empleado/departamento/listarDepartamento']);
       

      },
      error =>{
        console.log(error);
      }
    );
    }
    this.router.navigate(['/empleado/departamento/listarDepartamento']);
  }
}