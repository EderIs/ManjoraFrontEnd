import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HoraLaboral } from '../../../models/horaLaboral';
import { HorarioTrabajo } from '../../../models/horarioTrabajo';
import { HorarioLabService } from '../../../service/horario-lab.service';
import { HorarioTrapService } from '../../../service/horario-trap.service';


@Component({
  templateUrl: 'nuevoeditar-horarioTrabajo.component.html'
})

export class NuevoEditarHorarioTrabajoComponent implements OnInit{
  form: FormGroup;
  editMode=false;
  submitted=false;
  horarioTrab:HorarioTrabajo = null;

  horasLaborales: HoraLaboral[] = [];
  horaL: string[] = [];
  
 id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private horaLabService: HorarioLabService,
    private horaTrabService: HorarioTrapService,
    ) { }
  
  ngOnInit(): void {
    this.cargarHorasL();
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if (paramMap.has('id')) {
        this.editMode=true;
        const id = paramMap.get('id')
        console.log(id);
        this.horaTrabService.detail(parseInt(paramMap.get('id'))).subscribe(horarioTrab =>{
          this.horarioTrab = horarioTrab;
          this.initForm();
        });
      }else{
        this.horarioTrab = new HorarioTrabajo();
        this.initForm();
      }
    })
  }

  initForm(){
    this.form = new FormGroup({
      nombreHorariosT: new FormControl(this.horarioTrab ? this.horarioTrab.nombreHorariosT : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      diaSemana: new FormControl(this.horarioTrab ? this.horarioTrab.diaSemana: null,{
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      trabajarDesde: new FormControl(this.horarioTrab ? this.horarioTrab.diaSemana: null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),

      trabajarHasta: new FormControl(this.horarioTrab ? this.horarioTrab.diaSemana: null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),

      fechaInicio: new FormControl(this.horarioTrab ? this.horarioTrab.diaSemana: null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),

      fechaFinalizacion: new FormControl(this.horarioTrab ? this.horarioTrab.diaSemana: null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),

      periodoDia: new FormControl(this.horarioTrab ? this.horarioTrab.diaSemana: null,{
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      horasLaborales: new FormGroup({
        id: new FormControl(this.horarioTrab ? this.horarioTrab.horasLaborales: null,{
          updateOn: 'change',
          validators: [Validators.required]
        }),
        
      }),
    });
  }

  cargarHorasL(): void {
    this.horaLabService.lista().subscribe(
      data => {
        this.horasLaborales = data;
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
            this.horaTrabService.update(this.id,this.form.value).subscribe(
        data => {
          this.horarioTrab = data;
          alert('Se actualizo correctamente');
          this.router.navigate(['/empleado/puesto/listarPuesto']);
        },
        err => { 
          console.log(err);
        });

    }
    else {
      this.horaTrabService.save(this.form.value).subscribe(
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