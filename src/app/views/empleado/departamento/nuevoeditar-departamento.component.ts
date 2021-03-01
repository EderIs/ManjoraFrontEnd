import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Departamento } from '../../../models/departamento';
import { Empleado } from '../../../models/empleado';
import { DepartamentoService } from '../../../service/departamento.service';
import { EmpleadoService } from '../../../service/empleado.service';


@Component({
  templateUrl: 'nuevoeditar-departamento.component.html'
})

export class NuevoEditarDepartamentoComponent implements OnInit{
  form: FormGroup;
  editMode=false;
  submitted=false;
  departamento:Departamento = null;
  departamentoPadre: Departamento[] = [];
  departament: string[] = [];

  empleados: Empleado[] = [];
  empleado: string[] = [];
  
 id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private render: Renderer2,
    private departamentoService: DepartamentoService,
    ) { }
  
  ngOnInit(): void {
    this.cargarDepartamentos();
    this.cargarEmpleados();
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if (paramMap.has('id')) {
        this.editMode=true;
        const id = paramMap.get('id')
        console.log(id);
        this.departamentoService.detail(parseInt(paramMap.get('id'))).subscribe(depa =>{
          this.departamento = depa;
          this.initForm();
        });
      }else{
        this.departamento = new Departamento();
        this.initForm();
      }
    })
  }

  initForm(){
    this.form = new FormGroup({
      nombreDepartamento: new FormControl(this.departamento ? this.departamento.nombreDepartamento : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      estado: new FormControl(this.departamento ? this.departamento.estado: null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),

      empleado: new FormGroup({
        id: new FormControl(this.departamento ? this.departamento.empleado: null,{
          updateOn: 'change',
          validators: [Validators.required]
        }),
        
      }),
/*
      departamentoPadre: new FormGroup({
        id: new FormControl(this.departamento ? this.departamento.departamentoPadre: null,{
          updateOn: 'change',
          validators: [Validators.required]
        }),
          
      }),  
      */
    });
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
    this.departamentoService.lista().subscribe(
      data => {
        this.departamentoPadre = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  submit(){
    if (this.form.invalid) {
      return alert("form inavalido")
    }
    else if (this.id != null) {
            this.departamentoService.update(this.id,this.form.value).subscribe(
        data => {
          this.departamento = data;
          alert('Se actualizo correctamente');
          this.router.navigate(['/empleado/departamento/listarDepartamento']);
        },
        err => { 
          console.log(err);
        });

    }
    else {
      this.departamentoService.save(this.form.value).subscribe(
        response => {

          alert('Movimiento exitoso');
          this.router.navigate(['/empleado/departamento/listarDepartamento']);
        },
        err => {
          console.log(err);
        }
      );
    } 
    } 
    
}