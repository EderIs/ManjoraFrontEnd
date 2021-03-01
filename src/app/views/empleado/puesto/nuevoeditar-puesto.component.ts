import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  editMode=false;
  submitted=false;
  puesto:Puesto = null;

  departamentos: Departamento[] = [];
  departamento: string[] = [];
  
 id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private puestoService: PuestoService,
    private departamentoService: DepartamentoService,
    ) { }
  
  ngOnInit(): void {
    this.cargarDepartamentos();
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if (paramMap.has('id')) {
        this.editMode=true;
        const id = paramMap.get('id')
        console.log(id);
        this.puestoService.detail(parseInt(paramMap.get('id'))).subscribe(puesto =>{
          this.puesto = puesto;
          this.initForm();
        });
      }else{
        this.puesto = new Puesto();
        this.initForm();
      }
    })
  }

  initForm(){
    this.form = new FormGroup({
      nombrePuesto: new FormControl(this.puesto ? this.puesto.nombrePuesto : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      descripcionTrabajo: new FormControl(this.puesto ? this.puesto.descripcionTrabajo: null,{
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      departamento: new FormGroup({
        id: new FormControl(this.puesto ? this.puesto.departamento: null,{
          updateOn: 'change',
          validators: [Validators.required]
        }),
        
      }),
    });
  }

  cargarDepartamentos(): void {
    this.departamentoService.lista().subscribe(
      data => {
        this.departamentos = data;
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
            this.puestoService.update(this.id,this.form.value).subscribe(
        data => {
          this.puesto = data;
          alert('Se actualizo correctamente');
          this.router.navigate(['/empleado/puesto/listarPuesto']);
        },
        err => { 
          console.log(err);
        });

    }
    else {
      this.puestoService.save(this.form.value).subscribe(
        response => {

          alert('Movimiento exitoso');
          this.router.navigate(['/empleado/puesto/listarPuesto']);
        },
        err => {
          console.log(err);
        }
      );
    } 
    } 
} 