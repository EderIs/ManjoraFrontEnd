import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HoraLaboral } from '../../../models/horaLaboral';
import { HorarioLabService } from '../../../service/horario-lab.service';


@Component({
  templateUrl: 'nuevoeditar-horasL.component.html'
})

export class NuevoEditarHorasLComponent implements OnInit{
  form: FormGroup;
  editMode=false;
  submitted=false;
  horaLaboral:HoraLaboral = null;
  
 id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private horaLService: HorarioLabService,
    ) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if (paramMap.has('id')) {
        this.editMode=true;
        const id = paramMap.get('id')
        console.log(id);
        this.horaLService.detail(parseInt(paramMap.get('id'))).subscribe(depa =>{
          this.horaLaboral = depa;
          this.initForm();
        });
      }else{
        this.horaLaboral = new HoraLaboral();
        this.initForm();
      }
    })
  }

  initForm(){
    this.form = new FormGroup({
      nombreHoraL: new FormControl(this.horaLaboral ? this.horaLaboral.nombreHoraL : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      promedioHoraDia: new FormControl(this.horaLaboral ? this.horaLaboral.promedioHoraDia: null,{
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[0-9]')]
      }),
    });
  }


  submit(){
    if (this.form.invalid) {
      return alert("form inavalido")
    }
    else if (this.id != null) {
            this.horaLService.update(this.id,this.form.value).subscribe(
        data => {
          this.horaLaboral = data;
          alert('Se actualizo correctamente');
          this.router.navigate(['/empleado/departamento/listarDepartamento']);
        },
        err => { 
          console.log(err);
        });

    }
    else {
      this.horaLService.save(this.form.value).subscribe(
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