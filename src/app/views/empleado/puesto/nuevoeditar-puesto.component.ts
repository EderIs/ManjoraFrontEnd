import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Departamento } from '../../../models/departamento';
import { Puesto } from '../../../models/puesto';
import { DepartamentoService } from '../../../service/departamento.service';
import { PuestoService } from '../../../service/puesto.service';


@Component({
  templateUrl: 'nuevoeditar-puesto.component.html',
  styleUrls: ['nuevoeditar-puesto.componente.scss'],
})

export class NuevoEditarPuestoComponent implements OnInit {


  editMode = false;
  puesto: Puesto = null;
  private id: number = this.activatedRouter.snapshot.params.id;
  departamentos: Departamento[] = [];
  departamento: string[] = [];
  departamento1: number = 0;
  res: string;
  departamentoE: string[] = [];

  constructor(private puestoService: PuestoService
    , private activatedRouter: ActivatedRoute, private route: Router
    , private departamentoService: DepartamentoService, private rende2: Renderer2) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;
      }
    })


    if (this.id > 0) {
      this.puestoService.detail(this.id).subscribe(model => {

        this.puesto = model;

        this.cargarDepartamento();

        this.departamento1 = this.puesto.departamento.id;


      }, err => {

        console.log('error en: ' + err.mensaje);

      })
    } else {
      this.puesto = new Puesto('', null, '',);
      this.cargarDepartamento();
      this.departamento1 = 0;
    }
  }

  onCreate(): void {
    if (this.puesto.id > 0) {

      this.departamentoE.push(this.departamento1.toString(), " ");

      this.puestoService.update(this.puesto.id, new Puesto(this.puesto.nombrePuesto, new Departamento(this.departamentoE),
        this.puesto.descripcionTrabajo)).subscribe(model => {

          alert('se actualizo el puesto corretamente');
          this.route.navigate(['empleado/puesto/listarPuesto']);
        });


    } else {
      
      
      this.departamento.push(this.departamento1.toString(), " ");
      this.puesto.setDepartamento(new Departamento(this.departamento));
      this.puestoService.save(this.puesto).subscribe(model => {
        this.route.navigate(['empleado/puesto/listarPuesto']);

      }, err => {
       alert(err.error.mensaje);
        
        

      })
    }
  }

 



  onDetails() {

  }

  cargarDepartamento(): void {
    this.departamentoService.lista().subscribe(model => {

      this.departamentos = model;

    }, err => {

      console.log(err.err.mensaje);
    })

  }
  changePais(e): void {
  }

} 